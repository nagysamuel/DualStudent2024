import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../classes/Customer';
import { Subscription, first } from 'rxjs';
import { ClientSideRowModelModule, ColDef, GridApi, GridOptions, GridReadyEvent, IDateFilterParams, INumberFilterParams, ModuleRegistry } from 'ag-grid-community';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  private gridApi!: GridApi<Customer>;

  constructor(private router: Router, private ngZone: NgZone, private dataService: DataService) { }

  ngOnInit(): void {
    //Subscribe to changes of the customers then show them in the table
    this.subscription.add(
      this.dataService.customers.subscribe(customers => {
        this.rowData = customers;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Filter parameters for number filters of the table
  public numberFilterParams: INumberFilterParams = {
    allowedCharPattern: "\\d\\-\\,\\$",
    numberParser: (text: string | null) => {
      return text == null
        ? null
        : parseFloat(text.replace(",", ".").replace("$", ""));
    },
    numberFormatter: (value: number | null) => {
      return value == null ? null : value.toString().replace(".", ",");
    },
  };

  //Filter parameters for date filters of the table
  public dateFilterParams: IDateFilterParams = {
    comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split(".");
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0]),
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
      return 0;
    },
    minValidYear: 2000,
    maxValidYear: 2024,
    inRangeFloatingFilterDateFormat: "Do MMM YYYY",
  };

  //Represents the data of the table rows
  public rowData: Customer[] = [];

  // Column Definitions: Defines the columns to be displayed.
  public colDefs: ColDef[] = [
    {
      "field": "idx", "headerName": "Index", filter: "agNumberColumnFilter",
      filterParams: this.numberFilterParams, comparator: this.numberComparator
    },
    { "field": "customer_id", "headerName": "Customer Id", filter: true },
    { "field": "first_name", "headerName": "First Name", filter: true },
    { "field": "last_name", "headerName": "Last Name", filter: true },
    { "field": "company", "headerName": "Company", filter: true },
    { "field": "city", "headerName": "City", filter: true },
    { "field": "country", "headerName": "Country", filter: true },
    { "field": "phone1", "headerName": "Phone 1", filter: true },
    { "field": "phone2", "headerName": "Phone 2", filter: true },
    { "field": "email", "headerName": "Email", filter: true },
    { "field": "subscription_date", "headerName": "Subscription Date", filter: "agDateColumnFilter", filterParams: this.dateFilterParams, comparator: this.dateComparator },
    { "field": "website", "headerName": "Website", filter: true },
    {
      "field": "sales2021", "headerName": "SALES2021", filter: "agNumberColumnFilter",
      filterParams: this.numberFilterParams, comparator: this.numberComparator
    },
    {
      "field": "sales2022", "headerName": "SALES2022", filter: "agNumberColumnFilter",
      filterParams: this.numberFilterParams, comparator: this.numberComparator
    },
    {
      headerName: 'Sales Share',
      field: 'salesShareChart',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'Sales Share';
        button.addEventListener('click', () => {
          this.onButtonSalesShareClick(params.data);
        });
        return button;
      }
    },
    {
      headerName: 'Sales Development',
      field: 'salesDevelopmentChart',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'Sales Development';
        button.addEventListener('click', () => {
          this.onButtonSalesDevelopmentClick(params.data);
        });
        return button;
      }
    },
  ];

  //Grid options for the grid
  public gridOptions: GridOptions = {
    domLayout: 'normal',
    suppressHorizontalScroll: false,
    alwaysShowHorizontalScroll: true
  };

  //Number comparator: Used for sorting number columns
  private numberComparator(valueA: string, valueB: string) {
    // Assuming nulls and undefined values should be sorted to the bottom
    if (valueA == null && valueB == null) {
      return 0;
    }
    if (valueA == null) {
      return 1;
    }
    if (valueB == null) {
      return -1;
    }
    // Standard number comparison
    return Number(valueA) - Number(valueB);
  }

  //Date comparator: Used for sorting date columns
  private dateComparator(dateStrA: string, dateStrB: string) {
    // Handle nulls and undefined
    if (!dateStrA && !dateStrB) {
      return 0;
    }
    if (!dateStrA) {
      return 1;
    }
    if (!dateStrB) {
      return -1;
    }

    //Converts a string to a date
    const strToDate = (dateStr: string, seperator: string): Date => {
    
        const parts = dateStr.split(seperator);
    
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const year = parseInt(parts[2]);
    
        return new Date(year, month, day);
    }

    // Convert date strings to Date objects for comparison
    const dateA = new Date(strToDate(dateStrA, "."));
    const dateB = new Date(strToDate(dateStrB, "."));

    return dateA.getTime() - dateB.getTime();
  }

  public fetchData() {
    this.dataService.fetchCustomers();
  }

  public sortByName() {
    this.gridApi.applyColumnState({
      state: [{ colId: "last_name", sort: "asc", sortIndex: 0 },
              { colId: "first_name", sort: "asc", sortIndex: 1 }
      ],
      defaultState: { sort: null },
    });
  }

  public onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  public onButtonSalesShareClick(data: Customer): void {
    this.ngZone.run(() => {
      this.router.navigate(["/sales-share/" + data.customer_id]);
    });
  }

  public onButtonSalesDevelopmentClick(data: Customer): void {
    this.ngZone.run(() => {
      this.router.navigate(["/sales-development/" + data.customer_id]);
    });
  }

}

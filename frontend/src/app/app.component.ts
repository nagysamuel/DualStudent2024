import { AfterViewInit, Component } from '@angular/core';
import { ColDef, IDateFilterParams, INumberFilterParams } from 'ag-grid-community';
import { DataService } from '../services/data.service';
import { Customer } from '../classes/Customer';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'frontend';

  constructor(private dataService: DataService) { }

  numberFilterParams: INumberFilterParams = {
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

  dateFilterParams: IDateFilterParams = {
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

  rowData: Customer[] = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { "field": "idx", "headerName": "Index", filter: "agNumberColumnFilter", filterParams: this.numberFilterParams, comparator: this.numberComparator},
    { "field": "customer_id", "headerName": "Customer Id", filter: true},
    { "field": "first_name", "headerName": "First Name", filter: true},
    { "field": "last_name", "headerName": "Last Name", filter: true},
    { "field": "company", "headerName": "Company", filter: true},
    { "field": "city", "headerName": "City", filter: true},
    { "field": "country", "headerName": "Country", filter: true},
    { "field": "phone1", "headerName": "Phone 1", filter: true},
    { "field": "phone2", "headerName": "Phone 2", filter: true},
    { "field": "email", "headerName": "Email", filter: true},
    { "field": "subscription_date", "headerName": "Subscription Date", filter: "agDateColumnFilter", filterParams: this.dateFilterParams, comparator: this.dateComparator},
    { "field": "website", "headerName": "Website", filter: true},
    { "field": "sales2021", "headerName": "SALES2021", filter: "agNumberColumnFilter", filterParams: this.numberFilterParams, comparator: this.numberComparator},
    { "field": "sales2022", "headerName": "SALES2022", filter: "agNumberColumnFilter", filterParams: this.numberFilterParams, comparator: this.numberComparator}
  ];

  numberComparator(valueA: number, valueB: number) {
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
    return valueA - valueB;
}

 dateComparator(dateStrA: Date, dateStrB: Date) {
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
  // Convert date strings to Date objects for comparison
  const dateA = new Date(dateStrA);
  const dateB = new Date(dateStrB);

  return dateA.getTime() - dateB.getTime();
}



  fetchData() {
    this.dataService.fetchData().pipe(first()).subscribe(res => {
      const data: Customer[] = [];
      res.forEach(el => data.push(el));

      /*
      const header = data.splice(0, 1).at(0);
      const defs: ColDef[] = [];
      if (header) {
        const keys = Object.keys(header);
        const values = Object.values(header);
        keys.forEach((entry, index) => {
          defs.push({ field: entry, headerName: values[index], filter: true});
        });
      }
      */

      this.rowData = data;
    });
  }

  ngAfterViewInit(): void {
  }


}

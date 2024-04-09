import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../classes/Customer';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-sales-development',
  templateUrl: './sales-development.component.html',
  styleUrl: './sales-development.component.scss'
})
export class SalesDevelopmentComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  private customerId?: string | null;

  public options: AgChartOptions = {}

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit(): void {
    //Get parameters from route
    this.route.paramMap.subscribe(params => {
      //Gets the customer id from the url
      this.customerId = params.get("customer");

      if (this.customerId) {
        //Subscribes to changes of customers and filters when changes occur
        this.subscription.add(this.dataService.customers.subscribe(customers => {
          const customer = customers.filter(customer => this.customerId
            && customer.customer_id === this.customerId).at(0);
          if (customer) this.setOptions(customer);
        }));
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //Sets the options for the diagram
  private setOptions(customer: Customer): void {
    const data = [
      {year: "2021", amount: Number(customer.sales2021)},
      {year: "2022", amount: Number(customer.sales2022)}
    ]

    this.options = {
      data: data,
      title: {
        text: "Sales Development",
      },
      subtitle: {
        text: customer.first_name + " " + customer.last_name,
      },
      series: [
        {
          xKey: "year",
          yKey: "amount",
        }
      ],
    };
  }

}

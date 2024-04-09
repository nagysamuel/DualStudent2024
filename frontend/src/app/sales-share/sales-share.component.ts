import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AgChartOptions } from 'ag-charts-community';
import { Subscription } from 'rxjs';
import { Customer } from '../../classes/Customer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-share',
  templateUrl: './sales-share.component.html',
  styleUrls: ['./sales-share.component.scss']
})
export class SalesShareComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  private customerId?: string | null;

  public options: AgChartOptions = {}

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit(): void {
    //Get parameters from route
    this.route.paramMap.subscribe(params => {
      this.customerId = params.get("customer");

      this.subscription.add(this.dataService.customers.subscribe(customers => {
        const customer = customers.filter(customer => this.customerId 
                                          && customer.customer_id === this.customerId).at(0);
        if(customer) this.setOptions(customer);
      }))

    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setOptions(customer: Customer): void {
    const data = [
      {asset: "2021", amount: Number(customer.sales2021)},
      {asset: "2022", amount: Number(customer.sales2022)}
    ]

    this.options = {
      data: data,
      title: {
        text: "Sales Share",
      },
      subtitle: {
        text: customer.first_name + " " + customer.last_name,
      },
      series: [
        {
          type: "pie",
          angleKey: "amount",
          legendItemKey: "asset",
        },
      ],
    };
  }
}

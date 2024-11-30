package com.mybank.transaction;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DetailTransactions {

    @GetMapping("/api/transactions/items/{id}")
    public DetailTransactionItem transactions(@PathVariable String id) {

        DetailTransactionItem detailTransactionItem = new DetailTransactionItem(id, "03/11/2023", "10", "Latte", "CREDIT", "Starbucks Beverages Co.", "Beverages");
        
        return detailTransactionItem;
    }
}

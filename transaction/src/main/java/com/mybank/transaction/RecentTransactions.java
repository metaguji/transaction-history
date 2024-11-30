package com.mybank.transaction;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.ArrayList;

@RestController
public class RecentTransactions {

    List<TransactionItem> recentTransactions = new ArrayList<>();

    @GetMapping("/transactions/recent")
    public List<TransactionItem> recentTransactions() {

        recentTransactions.add(new TransactionItem("1", "01/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("2", "02/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("3", "03/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("4", "04/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("5", "05/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("6", "06/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("7", "07/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("8", "08/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("9", "09/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("10", "10/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("11", "11/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("12", "12/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("13", "13/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("14", "14/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("15", "15/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("16", "16/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("17", "17/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("18", "18/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("19", "19/11/2023", "10", "Latte", "CREDIT"));
        recentTransactions.add(new TransactionItem("20", "20/11/2023", "10", "Latte", "CREDIT"));


        return recentTransactions;


    }
}

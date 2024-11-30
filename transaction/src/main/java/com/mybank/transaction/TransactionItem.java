package com.mybank.transaction;

public class TransactionItem {

    private String id;
    private String date;
    private String amount;
    private String description;
    private String type;

    public TransactionItem(String id, String date, String amount, String description, String type) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.type = type;
    }

    public String getId() {
        return this.id;
    }
    public String getDate() {
        return this.date;
    }
    public String getAmount() {
        return this.amount;
    }
    public String getDescription() {
        return this.description;
    }
    public String getType() {
        return this.type;
    }
}

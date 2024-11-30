package com.mybank.transaction;

public class DetailTransactionItem {

    private String id;
    private String date;
    private String amount;
    private String description;
    private String type;
    
    private String merchantName;
    private String category;
    
    public DetailTransactionItem(String id, String date, String amount, String description, String type,
            String merchantName, String category) {

        // Existing fields from TransactionItem
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.type = type;

        // Additional fields for DetailTransactionItem
        this.merchantName = merchantName;
        this.category = category;
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
    public String getMerchantName() {
        return this.merchantName;
    }
    public String getCategory() {
        return this.category;
    }
   
}

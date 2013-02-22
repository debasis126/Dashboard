package com.appnomic.noc.viewobject.config;

import com.appnomic.noc.viewobject.config.base.IntegerAttributeVO;
import com.appnomic.noc.viewobject.config.base.StringArrayAttributeVO;

public class TransactionGridConfigVO {
	StringArrayAttributeVO transactions;
	StringArrayAttributeVO applications;
	IntegerAttributeVO transactionRefreshTime;
	
	public StringArrayAttributeVO getApplications() {
		return applications;
	}
	public void setApplications(StringArrayAttributeVO applications) {
		this.applications = applications;
	}
	public StringArrayAttributeVO getTransactions() {
		return transactions;
	}
	public void setTransactions(StringArrayAttributeVO transactions) {
		this.transactions = transactions;
	}
	public IntegerAttributeVO getTransactionRefreshTime() {
		return transactionRefreshTime;
	}
	public void setTransactionRefreshTime(IntegerAttributeVO transactionRefreshTime) {
		this.transactionRefreshTime = transactionRefreshTime;
	}
}

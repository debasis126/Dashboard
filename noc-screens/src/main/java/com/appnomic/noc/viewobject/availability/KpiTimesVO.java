package com.appnomic.noc.viewobject.availability;

public class KpiTimesVO {
	private String time;
	private KpiDataPointVO [] kpi;
	
	public KpiDataPointVO[] getKpi() {
		return kpi;
	}
	public void setKpi(KpiDataPointVO[] kpi) {
		this.kpi = kpi;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
}

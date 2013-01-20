package com.appnomic.noc.action;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;

@ParentPackage("json-default")
@Namespace("/noc")
public class RequestHandlerAction extends AbstractNocAction  {
	
	public RequestHandlerAction() {
	}
	
	@Action(value="/noc/RequestHandler", results = {
	        @Result(name="success", type="json", params = {
	        		"excludeProperties",
	                "parameters,session,SUCCESS,ERROR",
	                "enableGZIP", "true",
	        		"encoding", "UTF-8",
	                "noCache","true",
	                "excludeNullProperties","true"
	            })})
	public String nocAction() {
		return SUCCESS;
	}

	@Override
	public void setDummyData() {
		// TODO Auto-generated method stub
	}

}

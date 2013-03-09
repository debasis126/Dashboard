package com.appnomic.appsone.dashboard.action.noc;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.appnomic.appsone.dashboard.action.ActionConstants;
import com.appnomic.appsone.dashboard.action.noc.AbstractNocAction;
import com.appnomic.appsone.dashboard.config.AlertGridConfigManager;
import com.appnomic.appsone.dashboard.config.ConfigType;
import com.appnomic.appsone.dashboard.config.LevelDBManager;
import com.appnomic.appsone.dashboard.config.attribute.*;
import com.appnomic.appsone.dashboard.config.entity.AlertGridEntity;
import com.appnomic.appsone.dashboard.viewobject.config.AlertGridConfigVO;
import com.appnomic.appsone.dashboard.viewobject.config.PageListVO;
import com.appnomic.appsone.dashboard.viewobject.config.TabListVO;
import com.appnomic.appsone.dashboard.viewobject.config.base.BooleanAttributeVO;
import com.appnomic.appsone.dashboard.viewobject.config.base.IntegerAttributeVO;
import com.appnomic.appsone.dashboard.viewobject.config.base.StringAttributeVO;

@ParentPackage("json-default")
@Namespace("/noc")
public class NocUtilityAction extends AbstractNocAction {

	private PageListVO [] pageListVO;
	private Map<String, String[]> param;
	
	public PageListVO[] getPageListVO() {
		return pageListVO;
	}

	public void setPageListVO(PageListVO[] pageListVO) {
		this.pageListVO = pageListVO;
	}

	public Map<String, String[]> getParam() {
		return param;
	}

	public void setParam(Map<String, String[]> param) {
		this.param = param;
	}

	@Action(value="/noc/pages", results = {
	        @Result(name="success", type="json", params = {
	        		"excludeProperties",
	                "parameters,session,SUCCESS,ERROR,agcVO,levelDbMap",
	        		"enableGZIP", "true",
	        		"encoding", "UTF-8",
	                "noCache","true",
	                "excludeNullProperties","true"
	            })})
	public String pagesAction() {
		param = getParameters();
		pageListVO = getDummyList();
		return SUCCESS;
	}
	
	private PageListVO[] getDummyList() {
		List<PageListVO> pageList = new ArrayList<PageListVO>();
		
		PageListVO pageListVO = new PageListVO();
		pageListVO.setName("Alerts Grid");
		pageListVO.setId(UUID.randomUUID().toString());
		pageListVO.setType(ActionConstants.ACCTYPE.GRID.name());
		pageList.add(pageListVO);
		
		pageListVO = new PageListVO();
		pageListVO.setName("Clusters Grid");
		pageListVO.setId(UUID.randomUUID().toString());
		pageListVO.setType(ActionConstants.ACCTYPE.GRID.name());
		pageList.add(pageListVO);
		
		pageListVO = new PageListVO();
		pageListVO.setName("Transactions Grid");
		pageListVO.setId(UUID.randomUUID().toString());
		pageListVO.setType(ActionConstants.ACCTYPE.GRID.name());
		pageList.add(pageListVO);
		
		PageListVO [] pageArray = pageList.toArray(new PageListVO[pageList.size()]);
		return pageArray;
	}
}
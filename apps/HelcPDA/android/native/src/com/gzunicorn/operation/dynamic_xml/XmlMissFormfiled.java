package com.gzunicorn.operation.dynamic_xml;

 

//定义标签属性
public class XmlMissFormfiled {
	String name;
	String label;
	String type;
	boolean required;
	String options;
	String scope;
	public Object obj;
	String imagename;
	
	String inst_type_id;
	String inst_type;
	String num;
	String num_id;
	String module;
	
	String comment;
	String inputText;
	
	public Object getData()
	{
		if (type.equalsIgnoreCase("text") || type.equalsIgnoreCase("numeric"))
		{
			if (obj != null) {
				XmlMissEditBox b = (XmlMissEditBox) obj;
				return b.getValue();
			}
		}
		if (type.equalsIgnoreCase("choice")) {
			if (obj != null) {
				XmlMissPickOne po = (XmlMissPickOne) obj;
				return po.getValue();
			}
		}
		if ("checkbox".equalsIgnoreCase(type)) {
			if (obj instanceof XmlMissCheckBox) {
				XmlMissCheckBox xmcb = (XmlMissCheckBox) obj;
				return xmcb.getValue();
			} else if (obj instanceof XmlMissCheckBox_Menu) {
				XmlMissCheckBox_Menu xmcb = (XmlMissCheckBox_Menu) obj;
				return xmcb.getValue();
			}
		}
		if ("radio".equalsIgnoreCase(type)) {
			XmlMissRadio xmr = (XmlMissRadio) obj;
			return xmr.getValue();
		}
		
		// todo, add other UI elements here
		return null;
	}
	
//	public String toString()
//	{
//		StringBuilder sb = new StringBuilder();
//		sb.append("Field Name: " + this.name + "\n");
//		sb.append("Field Label: " + this.label + "\n");
//		sb.append("Field Type: " + this.type + "\n");
//		sb.append("Required? : " + this.required + "\n");
//		sb.append("Options : " + this.options + "\n");
//		sb.append("Value : " + (String) this.getData() + "\n");
//		
//		return sb.toString();
//	}
	
	public String getFormattedResult() { 
		return  this.name + "= [" + (String) this.getData() + "]";
	}

	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public boolean isRequired() {
		return required;
	}
	public void setRequired(boolean required) {
		this.required = required;
	}
	public String getOptions() {
		return options;
	}
	public void setOptions(String options) {
		this.options = options;
	}
	public Object getObj() {
		return obj;
	}
	public void setObj(Object obj) {
		this.obj = obj;
	}
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getImagename() {
		return imagename;
	}

	public void setImagename(String imagename) {
		this.imagename = imagename;
	}

	public String getInst_type_id() {
		return inst_type_id;
	}

	public void setInst_type_id(String inst_type_id) {
		this.inst_type_id = inst_type_id;
	}

	public String getInst_type() {
		return inst_type;
	}

	public void setInst_type(String inst_type) {
		this.inst_type = inst_type;
	}

	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public String getNum_id() {
		return num_id;
	}

	public void setNum_id(String num_id) {
		this.num_id = num_id;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getInputText() {
		return inputText;
	}

	public void setInputText(String inputText) {
		this.inputText = inputText;
	}

}

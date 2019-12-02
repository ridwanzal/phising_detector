
var MSG_INCORRECT_VALUE="Your form contains an error. Please correct the highlighted field below.";var MSG_INCORRECT_VALUES="Your form contains {nr_errors} errors. Please correct the highlighted fields below.";var BCKG_COLOR_VALUE_INVALID="#FFFFBF";var BCKG_COLOR_VALUE_VALID="#FFFFFF";var FIELD_CONST={ATTRIBUTE_SRC:'src',ATTRIBUTE_ID:'id',ATTRIBUTE_WIDTH:'width',ATTRIBUTE_HEIGHT:'height',ATTRIBUTE_HINT:'hint',FIELD_SELECTOR_CSS:'selectobject',ATTRIBUTE_FIELD_AUTOFILL:'field_default_value',ATTRIBUTE_FIELD_VALIDATOR:'field_validator',ATTRIBUTE_FIELD_MAXLENGTH:'field_maxlength',ATTRIBUTE_FIELD_WIDTH:'field_width',ATTRIBUTE_FIELD_HEIGHT:'field_height',ATTRIBUTE_FIELD_HINT:'field_hint',ATTRIBUTE_FIELD_WRAP:'field_wrap',ATTRIBUTE_FIELD_DEFAULT_VALUE:'field_default_value',ATTRIBUTE_FIELD_OPTIONS:'field_options',ATTRIBUTE_FIELD_VALUE:'field_value',ATTRIBUTE_FIELD_CHECKED:'field_checked',ATTRIBUTE_FIELD_MANDATORY:'field_mandatory',PASTED_FIELD_PREFIX:'copy_of_',PLUGIN_NAME_VALIDATOR:'value_validator = "__validator__reg_exp" validator_options = \'{"reg_exp":"^[a-zA-Z\_\-][a-zA-Z0-9\_\-]+$"}\' value_invalid_msg = "'+"Incorrect Value!\nPlease correct the marked field.\n\nThe name can contain only letters, digits, underscore (_) or dash (-)\nand cannot start with a digit."+'"'}
for(var i in FIELD_CONST_SHARED){FIELD_CONST[i]=FIELD_CONST_SHARED[i];}
var FORM_ACTIONS_CONST={SUBMIT_CAPTION_PROP_NAME:'submit_caption',PROP_PREFIX:'__action_prop__',LABEL_PROP_PREFIX:'__action_label__',HOLDER_ELEMENT_PREFIX:'__action_holder__',NAME_ATTRIBUTE:'action_name',EDIT_TMPL_LINK_HOLDER_ID:'edit_tmpl_link',TMPL_FIELD_PARAM_TYPE:'field_param',TMPL_FIELD_NAME_PREFIX:'$',composeActionPropPrefix:function(sActionName){return FORM_ACTIONS_CONST.PROP_PREFIX+sActionName;},composeActionPropName:function(sActionName,sPropName){return FORM_ACTIONS_CONST.composeActionPropPrefix(sActionName)+sPropName;}}
for(var i in FORM_ACTIONS_CONST_SHARED){FORM_ACTIONS_CONST[i]=FORM_ACTIONS_CONST_SHARED[i];}
var VALIDATOR_CONST={VALIDATOR_ATTRIBUTE_NAME:'field_validator',VALIDATOR_PROP_NAME:'validator',VALIDATION_NONE:0,VALIDATION_NOT_EMPTY:1,VALIDATION_EMAIL:2,VALIDATION_CHAR:3,VALIDATION_NUMBER:4,VALIDATION_PHONE:5,VALIDATION_DATE:6,VALIDATION_RE:7,PHONE_FORMAT_1:1,PHONE_FORMAT_2:2,PHONE_FORMAT_3:3,PHONE_FORMAT_4:4,DATE_FORMAT_1:1,DATE_FORMAT_2:2,DATE_FORMAT_3:3,DATE_FORMAT_4:4}
var MAP_VALIDATION_ID_IDENT={};MAP_VALIDATION_ID_IDENT[VALIDATOR_CONST.VALIDATION_NONE]='__validator__none';MAP_VALIDATION_ID_IDENT[VALIDATOR_CONST.VALIDATION_NOT_EMPTY]='__validator__not_empty';MAP_VALIDATION_ID_IDENT[VALIDATOR_CONST.VALIDATION_EMAIL]='__validator__email';MAP_VALIDATION_ID_IDENT[VALIDATOR_CONST.VALIDATION_CHAR]='__validator__character';MAP_VALIDATION_ID_IDENT[VALIDATOR_CONST.VALIDATION_NUMBER]='__validator__number';MAP_VALIDATION_ID_IDENT[VALIDATOR_CONST.VALIDATION_PHONE]='__validator__phone';MAP_VALIDATION_ID_IDENT[VALIDATOR_CONST.VALIDATION_DATE]='__validator__date';MAP_VALIDATION_ID_IDENT[VALIDATOR_CONST.VALIDATION_RE]='__validator__reg_exp';VALIDATOR_CONST.VALIDATIONS_LIST={};VALIDATOR_CONST.VALIDATIONS_LIST[VALIDATOR_CONST.VALIDATION_NONE]={name:"None",value:VALIDATOR_CONST.VALIDATION_NONE,options:[]};VALIDATOR_CONST.VALIDATIONS_LIST[VALIDATOR_CONST.VALIDATION_NOT_EMPTY]={name:"Not Empty",value:VALIDATOR_CONST.VALIDATION_NOT_EMPTY,options:[]};VALIDATOR_CONST.VALIDATIONS_LIST[VALIDATOR_CONST.VALIDATION_EMAIL]={name:"Email",value:VALIDATOR_CONST.VALIDATION_EMAIL,options:[]};VALIDATOR_CONST.VALIDATIONS_LIST[VALIDATOR_CONST.VALIDATION_CHAR]={name:"Letter",value:VALIDATOR_CONST.VALIDATION_CHAR,options:["length_from","length_to"]};VALIDATOR_CONST.VALIDATIONS_LIST[VALIDATOR_CONST.VALIDATION_NUMBER]={name:"Number",value:VALIDATOR_CONST.VALIDATION_NUMBER,options:["range_from","range_to"]};VALIDATOR_CONST.VALIDATIONS_LIST[VALIDATOR_CONST.VALIDATION_PHONE]={name:"Phone",value:VALIDATOR_CONST.VALIDATION_PHONE,options:["phone_format"]};VALIDATOR_CONST.VALIDATIONS_LIST[VALIDATOR_CONST.VALIDATION_DATE]={name:"Date",value:VALIDATOR_CONST.VALIDATION_DATE,options:["date_format"]};VALIDATOR_CONST.VALIDATIONS_LIST[VALIDATOR_CONST.VALIDATION_RE]={name:"Regular Expression",value:VALIDATOR_CONST.VALIDATION_RE,options:["reg_exp"]};


var FORM_WILDCARDS={"0":{"match":'date_time',"callback":"WC_DateTime()"},"1":{"match":'date',"callback":"WC_Date()"},"2":{"match":'browser_ver',"callback":"navigator.userAgent"},"3":{"match":'referrer',"callback":"document.referrer"}};function WC_Date(){return SK.Util.DateTime.format(null,'short_date_fmt');}
function WC_DateTime(){var locale=SK.Singletons.env.get('locale');var format=locale['short_date_fmt']+' '+locale['time_fmt'];return SK.Util.DateTime.format(null,format);}
function Form_SetTextFieldProps(oField){var sWidth=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_WIDTH);if(sWidth){oField.style.width=sWidth+"px";}
var sMaxLength=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_MAXLENGTH);if(sMaxLength){oField.maxLength=sMaxLength;}
Form_InitFieldHint(oField);}
function Form_SetHiddenFieldProps(oField){}
function Form_SetFileFieldProps(oField){}
function Form_SetTextAreaProps(oField){var sWidth=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_WIDTH);if(sWidth){oField.style.width=sWidth+"px";}
var sHeight=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_HEIGHT);if(sHeight){oField.style.height=sHeight+"px";}
var sWrap=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_WRAP);if(sWrap!=null&&sWrap!=''){oField.wrap=sWrap;}
Form_InitFieldHint(oField);}
function Form_SetDropDownProps(oField){var sWidth=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_WIDTH);if(sWidth){oField.style.width=sWidth+"px";}
if(oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_TYPE)==FIELD_CONST.DROPDOWN_TYPE_LIST){var sHeight=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_HEIGHT);if(sHeight){oField.className='control';oField.size=sHeight;}}
var sOptions=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_OPTIONS);var arrOptions=eval('('+sOptions+')');oField.options.length=0;for(var i=0;i<arrOptions.length;i++){var oOptionDef=arrOptions[i];var oOption=new Option(oOptionDef.name,oOptionDef.value);oField.options[oField.options.length]=oOption;}
for(var i=0;i<arrOptions.length;i++){var oOptionDef=arrOptions[i];oField.options[i].selected=oOptionDef.checked;}
Form_InitFieldHint(oField);}
function Form_SetCheckboxProps(oField){oField.checked=(oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_CHECKED)>0);var vValue=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_VALUE);if(vValue!=null){oField.value=vValue;}
Form_InitFieldHint(oField);}
function Form_SetRadioProps(oField){oField.checked=(oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_CHECKED)>0);var vValue=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_VALUE);if(vValue!=null){oField.value=vValue;}
Form_InitFieldHint(oField);}
function Form_SetResetProps(oField){oField.value=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_VALUE);}
function Form_SetSubmitProps(oField){}
function Form_AllowFormSubmissionDelayed(iFormNodeID,oForm){oForm.onsubmit=function(){return Form_OnSubmit(iFormNodeID,oForm);}
window.setTimeout(function(){Form_AllowFormSubmission(iFormNodeID,oForm);},7*1000);}
function Form_AllowFormSubmission(iFormNodeID,oForm){oForm.setAttribute('key_loaded','1');var form_submission_key=document.createElement('input');form_submission_key.setAttribute('type','hidden');form_submission_key.setAttribute('name','form_submission_key');form_submission_key.setAttribute('value',iFormNodeID);oForm.appendChild(form_submission_key);}
function Form_OnSubmit(iFormNodeID,oForm){if(oForm.getAttribute('submitted')>0||oForm.getAttribute('processing')>0){return false;}
oForm.setAttribute('processing',1);var oStatusMsgHolder=document.getElementById('form_status_msg_holder_'+iFormNodeID);if(oStatusMsgHolder!=null){oStatusMsgHolder.style.display='none';}
var oRC=Form_Validate(oForm);if(!oRC.valid){Form_DisplayFormInvalidMessage(iFormNodeID,oRC.invalid_fields,oForm,oRC.nr_errors);oForm.setAttribute('processing',0);return false;}
if(oForm.getAttribute('key_loaded')==null||!oForm.getAttribute('key_loaded')){oForm.setAttribute('processing',0);return false;}
oForm.setAttribute('submitted',1);oForm.setAttribute('processing',0);oForm.elements["do_submit_form_actions"].value="go";Form_EventTracker.trackEvent({label:oForm.getAttribute('name')});return true;}
var Form_EventTracker=new(new Class({Implements:[SK.EventTracker],et_params:{category:'Form',action:'Submit'}}))();function Form_DisplayFormInvalidMessage(iFormNodeID,arrInvalidFields,oForm,iNrErrors){document.getElementById('form_invalid_msg_'+iFormNodeID).innerHTML=(iNrErrors===1?MSG_INCORRECT_VALUE:MSG_INCORRECT_VALUES).supplant({nr_errors:iNrErrors});document.getElementById('form_invalid_msg_holder_'+iFormNodeID).style.display="";Form_ScrollToErrorMessage(iFormNodeID);}
function Form_ScrollToErrorMessage(iFormNodeID){var error_msg=_$('form_invalid_msg_holder_'+iFormNodeID);if(!Form_IsElementVisible(error_msg)){_$(!((Browser.name==='safari')||(Browser.name==='chrome'))?document.documentElement:document.body).scrollTop=error_msg.getPosition().y;}}
function Form_IsElementVisible(element){var topscroll=_$(!((Browser.name==='safari')||(Browser.name==='chrome'))?document.documentElement:document.body).scrollTop;var win_height=_$(window).getHeight();var elem_top=element.getPosition().y;var elem_height=element.getHeight();if(topscroll<=elem_top&&topscroll+win_height>=elem_top+elem_height){return true;}
return false;}
function Form_GetFieldErrHolderId(oField){return'err_holder_'+oField.name;}
function Form_Validate(oForm){var arrFields=oForm.elements;var bValid=true;var arrInvalidFields=[];var iNrErrorsFound=0;for(var i=0;i<arrFields.length;i++){var oField=arrFields[i];if(Form_IsUserCreatedField(oField)&&oField.getAttribute('type')!='submit'&&oField.getAttribute('type')!='reset'){if(oField.getAttribute('type')=='checkbox'){if(oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_MANDATORY)!=null&&oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_MANDATORY)>0){if(!oField.checked){Form_SetInvalidFieldDecoration(oField);iNrErrorsFound++;bValid=false;}else{Form_SetValidFieldDecoration(oField);}}}else{if(!ValidateField(oField)){Form_SetInvalidFieldDecoration(oField);arrInvalidFields[arrInvalidFields.length]=oField;iNrErrorsFound++;bValid=false;}else{Form_SetValidFieldDecoration(oField);}}}}
Form_InitErrorTooltips();var sRadioGroupsProps=oForm.radio_groups_props.value;var oRadioGroupsProps=eval('('+sRadioGroupsProps+')');for(var i=0;i<oRadioGroupsProps.length;i++){if(oRadioGroupsProps[i].checked){var sRadioButtonId=oRadioGroupsProps[i].name;var arrRadioButtons=oForm[sRadioButtonId];if(isDefined(arrRadioButtons)){if(isDefined(arrRadioButtons.length)&&arrRadioButtons.length>0){var bCheckedRadioFound=false;for(var j=0;j<arrRadioButtons.length;j++){Form_SetValidFieldDecoration(arrRadioButtons[j]);if(arrRadioButtons[j].checked){bCheckedRadioFound=true;break;}}
if(!bCheckedRadioFound){bValid=false;for(var j=0;j<arrRadioButtons.length;j++){Form_SetInvalidFieldDecoration(arrRadioButtons[j]);}
iNrErrorsFound++;}}else{var oRadioButton=arrRadioButtons;if(oRadioButton.checked){Form_SetValidFieldDecoration(oRadioButton);}else{bValid=false;iNrErrorsFound++;Form_SetInvalidFieldDecoration(oRadioButton);}}}}}
Form_InitErrorTooltips();return{valid:bValid,invalid_fields:arrInvalidFields,nr_errors:iNrErrorsFound};}
function Form_SetInvalidFieldDecoration(oField){oField=_$(oField);var sErrMsgHolderId=Form_GetFieldErrHolderId(oField);var oErrMsgHolder=document.getElementById(sErrMsgHolderId);if(oErrMsgHolder==null){var sValidatorMessage='';if(oField.getAttribute('type')=='checkbox'){sValidatorMessage='This is a mandatory field.';}else if(oField.getAttribute('type')=='radio'){sValidatorMessage='Please select one of the radio button options.';}else{sValidatorMessage=Validator_GetMessage(oField);}
var events={keyup:Field_HandleChange};if(['checkbox','radio'].contains(oField.getProperty('type'))){events.click=Field_HandleChange;}
oField.addClass('form-field-error').removeEvents(events).addEvents(events);var radio_group=Form_GetRadioGroup(oField);if(radio_group){radio_group.removeEvents(events).addEvents(events);}
var oErrMsgHolderNode=new Element('div',{'class':'form-field-error-icon',id:Form_GetFieldErrHolderId(oField)});if(oField.nextSibling){oField.parentNode.insertBefore(oErrMsgHolderNode,oField.nextSibling);}else{oField.parentNode.appendChild(oErrMsgHolderNode);}
Form_RegisterErrorTooltip(oErrMsgHolderNode,sValidatorMessage);}}
function Form_SetValidFieldDecoration(oField){_$(oField).removeClass('form-field-error');var sErrMsgHolderId=Form_GetFieldErrHolderId(oField);var oErrMsgHolder=document.getElementById(sErrMsgHolderId);if(oErrMsgHolder!=null){oErrMsgHolder.parentNode.removeChild(oErrMsgHolder);}}
function Form_Initialize(iFormNodeID,sFormName){var oForm=$$('form[name='+sFormName+']')[0];var arrFields=oForm.elements;for(var i=0;i<arrFields.length;i++){var oField=arrFields[i];if(!Form_IsUserCreatedField(oField)){continue;}
Form_SetFieldValidations(oField);Form_SetFieldProps(oField);Form_SetFieldAutoFill(oField);}
oForm.onreset=Form_Reset;}
function Form_Reset(){var arrFields=this.elements;for(var i=0;i<arrFields.length;i++){var oField=arrFields[i];SetFieldValue(oField,'');Form_SetFieldProps(oField);Form_SetFieldAutoFill(oField);}
return(false);}
function Form_GetByFieldById(sFieldId,oForm){var arrFields=oForm.elements;for(var i=0;i<arrFields.length;i++){if(arrFields[i].getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_ID)==sFieldId){return arrFields[i];}}
return null;}
function Form_SetFieldValidations(oField){var sValidator=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_VALIDATOR);if(sValidator!=null){try{var oValidator=eval('('+sValidator+')');}catch(e){return;}
var sValidatorIdent=MAP_VALIDATION_ID_IDENT[oValidator.id];var sValidatorOptions=stringify(oValidator.options);Validator_SetFieldValidators(oField,sValidatorIdent,sValidatorOptions);}}
function Form_SetFieldAutoFill(oField){var sAutoFills=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_AUTOFILL);if(sAutoFills!=null){for(var k in FORM_WILDCARDS){var reWildcards=new RegExp("\\$"+FORM_WILDCARDS[k].match+"\\$?");if(sAutoFills.match(reWildcards)){var str_replacement=eval(FORM_WILDCARDS[k].callback);sAutoFills=sAutoFills.replace(reWildcards,str_replacement);}}
SetFieldValue(oField,sAutoFills);}}
function Form_SetFieldProps(oField){var sFieldType=Form_GetFieldType(oField);oField.className=mapFieldType_Props[sFieldType].css_class;var oPropsSetFunction=mapFieldType_Props[sFieldType].set_props_function;oPropsSetFunction(oField);}
function Form_IsUserCreatedField(oField){return(oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_ID)!=null);}
function Form_GetFieldType(oField){var sType=oField.getAttribute('type');if(sType!=null){return sType}
if(oField.tagName=='TEXTAREA'){return FIELD_CONST.TEXTAREA_TYPE;}
if(oField.tagName=='SELECT'){return FIELD_CONST.DROPDOWN_TYPE;}
return null;}
function Form_GetRadioGroup(radio){if(radio.get('tag')=='input'&&radio.getProperty('type')=='radio'){return radio.getParent('form').getElements('input[type="radio"][name="'+radio.getProperty('name')+'"]').filter(':not([value="'+radio.getProperty('value')+'"])');}
return null;}
function Field_HandleChange(){Form_SetValidFieldDecoration(this);_$(this).removeEvents({keyup:arguments.callee,change:arguments.callee});}
var mapFieldType_Props=[];mapFieldType_Props['text']={css_class:'textfield',set_props_function:Form_SetTextFieldProps}
mapFieldType_Props['password']=mapFieldType_Props['text'];mapFieldType_Props['hidden']={css_class:'',set_props_function:Form_SetHiddenFieldProps};mapFieldType_Props['file']={css_class:'filefield',set_props_function:Form_SetFileFieldProps};mapFieldType_Props[FIELD_CONST.TEXTAREA_TYPE]={css_class:'textareafieldsmall',set_props_function:Form_SetTextAreaProps}
mapFieldType_Props[FIELD_CONST.DROPDOWN_TYPE]={css_class:'selectobject',set_props_function:Form_SetDropDownProps}
mapFieldType_Props['checkbox']={css_class:'checkbox',set_props_function:Form_SetCheckboxProps}
mapFieldType_Props['radio']={css_class:'radio',set_props_function:Form_SetRadioProps}
mapFieldType_Props['reset']={css_class:'button',set_props_function:Form_SetResetProps}
mapFieldType_Props['submit']={css_class:'button',set_props_function:Form_SetSubmitProps}
function Form_InitFieldHint(oField){var sHint=oField.getAttribute(FIELD_CONST.ATTRIBUTE_FIELD_HINT);if(!sHint){return;}
Form_RegisterTooltip(_$(oField),sHint);}
var Form_RegisteredTooltips=[];function Form_RegisterTooltip(oField,sHint){if(!Form_IsTooltipRegistered(oField)){Form_RegisteredTooltips.push({field:oField,hint:sHint});}}
function Form_IsTooltipRegistered(field){for(var i=0,l=Form_RegisteredTooltips.length;i<l;i+=1){if(Form_RegisteredTooltips[i].field===field){return true;}}
return false;}
_$(window).addEvent('domready',function(){for(var i=0,l=Form_RegisteredTooltips.length;i<l;i+=1){var field=Form_RegisteredTooltips[i].field;var hint=Form_RegisteredTooltips[i].hint;if(!field.getWidth()){Form_ShowParentContainers(field);}
var tip=new SK.UI.Tip(_$(field),'',hint,{onoffset:function(e){return{x:e.getCoordinates().width,y:0};}});}
Form_HideParentContainers();});var Form_HiddenContainers=[];function Form_ShowParentContainers(field){var parent=field;do{parent=parent.getParent();if(!parent.getWidth()){Form_HiddenContainers.push(parent);var inline_styles={};var computed_styles={};(parent.style.position?inline_styles:computed_styles).position=parent.getStyle('position');(parent.style.left?inline_styles:computed_styles).left=parent.getStyle('left');(parent.style.display?inline_styles:computed_styles).display=parent.getStyle('display');(parent.style.visibility?inline_styles:computed_styles).visibility=parent.getStyle('visibility');parent.setStyles({position:'absolute',left:-3000,display:'block',visibility:'visible'});parent.store('form:inlinestyles',inline_styles);parent.store('form:computedstyles',computed_styles);}}while(parent!==document.body);}
function Form_HideParentContainers(field){Form_HiddenContainers.each(function(parent){var inline_styles=parent.retrieve('form:inlinestyles');var computed_styles=parent.retrieve('form:computedstyles');['position','left','display','visibility'].each(function(style){if(inline_styles[style]){parent.setStyle(style,inline_styles[style]);}else{parent.setStyle(style,'');}});});}
var FF_mouse_y=0;var FF_mouse_x=0;function SetFFMouseCoords(e){FF_mouse_y=e.pageY;FF_mouse_x=e.pageX;}
window.onmousemove=SetFFMouseCoords;var FormErrorTooltips=new Elements([]);function Form_RegisterErrorTooltip(error_el,tip){error_el.store('tip:title','');error_el.store('tip:text',tip);FormErrorTooltips.push(error_el);}
function Form_InitErrorTooltips(){new Tips(FormErrorTooltips,{className:'sk-tip sk-form-tip-error',fixed:true,offsets:{x:20,y:0}});delete FormErrorTooltips;FormErrorTooltips=new Elements([]);}


function GetFieldValue(oField){var vValue;if(oField.type=='text'||oField.type=='file'||oField.type=='hidden'||oField.type=='password'||oField.tagName=='TEXTAREA'){vValue=oField.value;}else if(oField.type=='checkbox'){vValue=oField.checked;}else if(oField.type=='radio'){vValue=oField.value;}else if(oField.tagName=='SELECT'){vValue=oField.selectedIndex==-1?"":oField.options[oField.selectedIndex].value;}
return vValue;}
function SetFieldValue(oField,vValue){if(!oField){return false;}
if(oField.type=='text'||oField.type=='password'||oField.tagName=='TEXTAREA'){oField.value=(vValue!=null)?vValue:'';}else if(oField.type=='hidden'){if(vValue!=null&&vValue!=''){oField.value=vValue;}}else if(oField.type=='checkbox'){var bChecked=false;if(vValue=='true'){bChecked=true;}else if(vValue=='false'){bChecked=false;}else if(vValue>0){bChecked=true;}else{bChecked=vValue;}
oField.checked=bChecked;}else if(oField.type=='radio'){}else if(oField.tagName=='SELECT'){return ListSetSelectedValue(oField,vValue,false);}
return true;}
function ListSetSelectedValue(oList,vValue,bSelectFirstWhenNotFound){if(!oList){return;}
ListResetSelection(oList);var bFound=false;for(var i=0;i<oList.options.length;i++){if(oList.options[i].value==vValue){oList.options[i].selected=true;bFound=true;break;}}
if((!bFound)&&bSelectFirstWhenNotFound&&(oList.options.length>0)){oList.options[0].selected=true;}
return bFound;}
function ListResetSelection(oList){if(!oList){return;}
for(var i=0;i<oList.options.length;i++){oList.options[i].selected=false;}}
function ListMoveOptions(sFromId,sToId){var oDest=document.getElementById(sToId);var oFrom=document.getElementById(sFromId);var arrSelectedOptions=ListCutSelectedOptions(sFromId);for(var i=0;i<arrSelectedOptions.length;i++){arrSelectedOptions[i].selected=false;oDest.options[oDest.options.length]=arrSelectedOptions[i];}}
function ListCutSelectedOptions(sListID){var oList=document.getElementById(sListID);if(!oList){return[];}
var arrSelectedOptions=[];for(var i=0;i<oList.options.length;i++){if(oList.options[i].selected&&oList.options[i].value!=''){arrSelectedOptions[arrSelectedOptions.length]=oList.options[i];oList.remove(i);i--;}}
return arrSelectedOptions;}
function Filter_Trim(vValue){return vValue.trim();}
function Filter_Integer(vValue){return(isNaN(parseInt(vValue,10)))?'':parseInt(vValue,10);}
var MapFilterName_Filter={__filter__trim:Filter_Trim,__filter__int:Filter_Integer};function FilterFieldValue(vValue,vFilter){var vFilteredValue=vValue;var arrFilters=vFilter.split(',');for(var i=0;i<arrFilters.length;i++){var sCurrFilter=arrFilters[i].trim();if(isDefined(MapFilterName_Filter[sCurrFilter])){vFilteredValue=MapFilterName_Filter[sCurrFilter](vFilteredValue);}}
return vFilteredValue;}
function FilterField(oField,vFilter){SetFieldValue(oField,FilterFieldValue(GetFieldValue(oField),vFilter));}
function Validator_None(vValue){return true;}
function Validator_None_Message(){return'';}
function Validator_IsInteger(vValue){return(parseInt(vValue).toString().length==vValue.toString().length&&!isNaN(parseInt(vValue,10)));}
function Validator_IsInteger_Message(){return'An integer number is required.';}
function Validator_IsPositiveInteger(vValue){return(Validator_IsInteger(vValue)&&vValue>0);}
function Validator_IsPositiveInteger_Message(){return'A positive integer number is required.';}
function Validator_IsNonNegativeInteger(vValue){return(Validator_IsInteger(vValue)&&vValue>=0);}
function Validator_IsNonNegativeInteger_Message(){return'A non-negative integer number is required.';}
function Validator_IsNotEmpty(vValue){return(vValue.toString()!='');}
function Validator_IsNotEmpty_Message(){return'This is a mandatory field.';}
function Validator_EmptyOrPositiveInteger(vValue){return(!Validator_IsNotEmpty(vValue)||Validator_IsPositiveInteger(vValue));}
function Validator_EmptyOrPositiveInteger_Message(){return'Either enter a positive integer number or leave the field empty.';}
function Validator_EmptyOrNonNegativeInteger(vValue){return(!Validator_IsNotEmpty(vValue)||Validator_IsNonNegativeInteger(vValue));}
function Validator_EmptyOrNonNegativeInteger_Message(){return'Either enter a non-negative integer number or leave the field empty.';}
function Validator_Email(vValue){return/^([a-z0-9\-\_\.])*\@(([a-z0-9\-\_\.]*)\.)([a-z0-9]*)/i.test(vValue);}
function Validator_Email_Message(){return'Please enter a valid email address.'}
function Validator_Character(vValue,oOptions){if(vValue.match(/^[a-z\n\r]+$/i)==null){return false;}
if(isDefined(oOptions)){vValue=vValue.replace(/\n|\r/g,'');if(isDefined(oOptions.length_from)&&oOptions.length_from!=''){if(vValue.toString().length<oOptions.length_from){return false;}}
if(isDefined(oOptions.length_to)&&oOptions.length_to!=''){if(vValue.toString().length>oOptions.length_to){return false;}}}
return true;}
function Validator_Character_Message(oOptions){if(isDefined(oOptions)){var sMessage='';if(oOptions.length_from){sMessage+='Enter not less than '+oOptions.length_from+' letters.';}
if(oOptions.length_to){sMessage+='Enter not more than '+oOptions.length_to+' letters.';}
if(oOptions.length_from&&oOptions.length_to){sMessage='Enter not less than '+oOptions.length_from+' and not more than '+oOptions.length_to+' letters.';}
if(sMessage!=''){return sMessage;}}
return'This is a mandatory field. Please note this field accepts only letters.';}
function Validator_Number(vValue,oOptions){if(vValue.match(/^[\-]*[\d]+[\.]{0,1}[\d]*$/)==null){return false;}
if(isDefined(oOptions)){if(isDefined(oOptions.range_from)&&oOptions.range_from.toString()!=''){if(parseFloat(vValue)<parseFloat(oOptions.range_from)){return false;}}
if(isDefined(oOptions.range_to)&&oOptions.range_to.toString()!=''){if(parseFloat(vValue)>parseFloat(oOptions.range_to)){return false;}}}
return true;}
function Validator_Number_Message(oOptions){if(isDefined(oOptions)){var sMessage='';var bRangeFromFound=false;if(isDefined(oOptions.range_from)&&oOptions.range_from.toString()!=''){sMessage+='Enter a number not less than '+oOptions.range_from+'.';bRangeFromFound=true;}
var bRangeToFound=false;if(isDefined(oOptions.range_to)&&oOptions.range_to.toString()!=''){sMessage+='Enter a number up to '+oOptions.range_to+'.';bRangeToFound=true;}
if(bRangeFromFound&&bRangeToFound){sMessage='Enter a number between '+oOptions.range_from+' and '+oOptions.range_to+'.';}
if(sMessage!=''){return sMessage;}}
return'This is a mandatory field. Please note this field accepts only numbers.';}
var mapPhoneFormat_Data={"1":{reg_exp:/^\(\d{3}\) \d{3} \d{4}$/,format:'(310) 571 3135'},"2":{reg_exp:/^\d{3}\.\d{3}\.\d{4}$/,format:'310.571.3135'},"3":{reg_exp:/^\d{3} \d{3} \d{4}$/,format:'310 571 3135'},"4":{reg_exp:/^\d{3}\-\d{3}\-\d{4}$/,format:'310-571-3135'}}
function Validator_Phone(vValue,oOptions){if(isDefined(oOptions)&&isDefined(oOptions.phone_format)){var sPhoneFormatId=oOptions.phone_format;var oData=mapPhoneFormat_Data[sPhoneFormatId];if(isDefined(oData)){var oRegExp=oData.reg_exp;return(vValue.match(oRegExp)!=null);}}
var oDefaultPhoneRe=/^[\(\)\.x\ \-\d]+$/;var sDigitsOnly=vValue.replace(/[^\d]+/g,'');return(vValue.match(oDefaultPhoneRe)!=null&&sDigitsOnly.toString().length>4);}
function Validator_Phone_Message(oOptions){if(isDefined(oOptions)&&isDefined(oOptions.phone_format)){var sPhoneFormatId=oOptions.phone_format;var oData=mapPhoneFormat_Data[sPhoneFormatId];if(isDefined(oData)){var sFormat=oData.format;return'The required phone number format is ['+sFormat+'].';}}
return'Please enter a valid phone number. At least 5 digits, allowed characters are numbers, space, dot, dash, x and parentheses.';}
var mapDateFormat_Data={"1":{handler:ValidDate_1,format:'YYYY-MM-DD'},"2":{handler:ValidDate_2,format:'YY-MM-DD'},"3":{handler:ValidDate_3,format:'DD-MM-YYYY'},"4":{handler:ValidDate_4,format:'DD-MM-YY'}}
function IsValidDateCombination(iYear,iMonth,iDate){if(iYear<0){return false;}
if(iDate<1||iDate>31){return false;}
if(iMonth<1||iMonth>12){return false;}
return true;}
function ValidDate_1(sDate){var re=/^(\d{4})\-(\d{2})\-(\d{2})$/;if(sDate.match(re)==null){return false;}
var arr=re.exec(sDate);return IsValidDateCombination(parseInt(RegExp.$1,10),parseInt(RegExp.$2,10),parseInt(RegExp.$3,10));}
function ValidDate_2(sDate){var re=/^(\d{2})\-(\d{2})\-(\d{2})$/;if(sDate.match(re)==null){return false;}
var arr=re.exec(sDate);return IsValidDateCombination(parseInt(RegExp.$1,10),parseInt(RegExp.$2,10),parseInt(RegExp.$3,10));}
function ValidDate_3(sDate){var re=/^(\d{2})\-(\d{2})\-(\d{4})$/;if(sDate.match(re)==null){return false;}
var arr=re.exec(sDate);return IsValidDateCombination(parseInt(RegExp.$3,10),parseInt(RegExp.$2,10),parseInt(RegExp.$1,10));}
function ValidDate_4(sDate){var re=/^(\d{2})\-(\d{2})\-(\d{2})$/;if(sDate.match(re)==null){return false;}
var arr=re.exec(sDate);return IsValidDateCombination(parseInt(RegExp.$3,10),parseInt(RegExp.$2,10),parseInt(RegExp.$1,10));}
function Validator_Date(vValue,oOptions){vValue=vValue.replace(/[\/\.\\]+/g,'-');if(isDefined(oOptions)&&isDefined(oOptions.date_format)){var sDateFormatId=oOptions.date_format;var oData=mapDateFormat_Data[sDateFormatId];if(isDefined(oData)){var oValidateFunction=oData.handler;return oValidateFunction(vValue);}}
return false;}
function Validator_Date_Message(oOptions){if(isDefined(oOptions)&&isDefined(oOptions.date_format)){var sDateFormatId=oOptions.date_format;var oData=mapDateFormat_Data[sDateFormatId];if(isDefined(oData)){var sFormat=oData.format;return'Please enter a valid date. The correct date format is '+sFormat+'.';}}
return'Enter a valid date.';}
function Validator_RegExp(vValue,oOptions){if(isDefined(oOptions)&&isDefined(oOptions.reg_exp)){var sRegExp=oOptions.reg_exp;if(sRegExp.indexOf('/')==-1){sRegExp='/'+sRegExp+'/';}
var oRegExp=eval(sRegExp);return(vValue.match(oRegExp)!=null);}
return true;}
function Validator_RegExp_Message(oOptions){if(isDefined(oOptions)&&isDefined(oOptions.reg_exp)){var sRegExp=oOptions.reg_exp;return'A value that matches the regular expression ['+sRegExp+'] is required.';}
return'';}
var MapValidatorName_Validator={__validator__int:Validator_IsInteger,__validator__positive_int:Validator_IsPositiveInteger,__validator__nonnegative_int:Validator_IsNonNegativeInteger,__validator__not_empty:Validator_IsNotEmpty,__validator__empty_or_positive_int:Validator_EmptyOrPositiveInteger,__validator__empty_or_nonnegative_int:Validator_EmptyOrNonNegativeInteger,__validator__none:Validator_None,__validator__email:Validator_Email,__validator__character:Validator_Character,__validator__number:Validator_Number,__validator__phone:Validator_Phone,__validator__date:Validator_Date,__validator__reg_exp:Validator_RegExp}
var MapValidatorName_Message={__validator__int:Validator_IsInteger_Message,__validator__positive_int:Validator_IsPositiveInteger_Message,__validator__nonnegative_int:Validator_IsNonNegativeInteger_Message,__validator__not_empty:Validator_IsNotEmpty_Message,__validator__empty_or_positive_int:Validator_EmptyOrPositiveInteger_Message,__validator__empty_or_nonnegative_int:Validator_EmptyOrNonNegativeInteger_Message,__validator__none:Validator_None_Message,__validator__email:Validator_Email_Message,__validator__character:Validator_Character_Message,__validator__number:Validator_Number_Message,__validator__phone:Validator_Phone_Message,__validator__date:Validator_Date_Message,__validator__reg_exp:Validator_RegExp_Message}
function ValidateFieldValue(vValue,vValidator,oOptions){if(isDefined(MapValidatorName_Validator[vValidator])){return MapValidatorName_Validator[vValidator](vValue,oOptions);}
return true;}
var ATTRIBUTE_VALIDATOR_VALUE='value_validator';var ATTRIBUTE_VALIDATOR_OPTIONS='validator_options';function ValidateField(oField){var sValidatorValue=oField.getAttribute(ATTRIBUTE_VALIDATOR_VALUE);if(sValidatorValue!=null){var oOptions=null;var sOptions=oField.getAttribute(ATTRIBUTE_VALIDATOR_OPTIONS);if(sOptions!=null){oOptions=eval('('+sOptions+')')}
return ValidateFieldValue(GetFieldValue(oField),sValidatorValue,oOptions);}
return true;}
function CheckFieldValidation(oField){if(!ValidateField(oField)){alert('Incorrect Value!\n\nValue should be validated as:\n'+Validator_GetMessage(oField));}}
function Validator_SetFieldValidators(oField,sValidatorIdent,sValidatorOptions){if(sValidatorOptions){oField.setAttribute(ATTRIBUTE_VALIDATOR_OPTIONS,sValidatorOptions);}
oField.setAttribute(ATTRIBUTE_VALIDATOR_VALUE,sValidatorIdent);}
function Validator_SetFieldEvents(oField,sAction){if(!sAction){sAction='CheckFieldValidation(this)';}
if(oField.tagName=='INPUT'||oField.tagName=='TEXTAREA'){if(oField.getAttribute('type')=='checkbox'||oField.getAttribute('type')=='radio'){oField.onclick=new Function(sAction);}else{oField.onblur=new Function(sAction);}}else if(oField.tagName=='SELECT'){oField.onchange=new Function(sAction);}}
function Validator_GetMessage(oField){var vValidator=oField.getAttribute(ATTRIBUTE_VALIDATOR_VALUE);if(vValidator!=null){var oOptions=null;var sOptions=oField.getAttribute(ATTRIBUTE_VALIDATOR_OPTIONS);if(sOptions!=null){oOptions=eval('('+sOptions+')')}
if(isDefined(MapValidatorName_Message[vValidator])){return MapValidatorName_Message[vValidator](oOptions);}}
return'';}


String.prototype.entityify=function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
String.prototype.quote=function(){return'"'+this.replace(/(["\\])/g,'\\$1')+'"';}
String.prototype.supplant=function(oProps,bReplaceWithBlank,oCallBack){var i,j,vValue;var sString=this;var q=0;var sOpenTag=(isUndefined(oProps.__open_tag))?'{':oProps.__open_tag;var sCloseTag=(isUndefined(oProps.__close_tag))?'}':oProps.__close_tag;for(;;){i=q+sString.substring(q,sString.length).indexOf(sOpenTag);if(i<0){break;}
if(i+1<=q){break;}
j=sString.indexOf(sCloseTag,i+1);if(j==-1){break;}
if(isDefined(oCallBack)){vValue=oCallBack(sString.substring(i+1,j),oProps);}else{vValue=oProps[sString.substring(i+1,j)];}
if(isUndefined(vValue)){if(bReplaceWithBlank){vValue='';}else{q=i+1;continue;}}
sString=sString.substring(0,i)+vValue+sString.substring(j+1);}
return sString;}
String.prototype.trim=function(){return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1");}
if(!isFunction(Function.apply)){Function.prototype.apply=function(o,a){var r,x='____apply';if(!isObject(o)){o={};}
o[x]=this;switch((a&&a.length)||0){case 0:r=o[x]();break;case 1:r=o[x](a[0]);break;case 2:r=o[x](a[0],a[1]);break;case 3:r=o[x](a[0],a[1],a[2]);break;case 4:r=o[x](a[0],a[1],a[2],a[3]);break;case 5:r=o[x](a[0],a[1],a[2],a[3],a[4]);break;case 6:r=o[x](a[0],a[1],a[2],a[3],a[4],a[5]);break;default:}
delete o[x];return r;}}
Function.prototype.inherits=function(parent){var d=0,p=(this.prototype=new parent());this.prototype.uber=function uber(name){var f,r,t=d,v=parent.prototype;if(t){while(t){v=v.constructor.prototype;t-=1;}
f=v[name];}else{f=p[name];if(f==this[name]){f=v[name];}}
d+=1;r=f.apply(this,Array.prototype.slice.apply(arguments,[1]));d-=1;return r;}
return this;}
Function.prototype.swiss=function(parent){for(var i=1;i<arguments.length;i+=1){var name=arguments[i];this.prototype[name]=parent.prototype[name];}
return this;}
function isAlien(a){return isObject(a)&&typeof a.constructor!='function';}
function isArray(a){return isObject(a)&&a.constructor==Array;}
function isBoolean(a){return typeof a=='boolean';}
function isEmpty(o){var i,v;if(isObject(o)){for(i in o){v=o[i];if(isUndefined(v)&&isFunction(v)){return false;}}}
return true;}
function isFunction(a){return typeof a=='function';}
function isNull(a){return typeof a=='object'&&!a;}
function isNumber(a){return typeof a=='number'&&isFinite(a);}
function isObject(a){return(a&&typeof a=='object')||isFunction(a);}
function isString(a){return typeof a=='string';}
function isUndefined(a){return typeof a=='undefined';}
function isDefined(a){return typeof a!='undefined';}
function stringify(arg){var i,o,v;switch(typeof arg){case'object':if(arg){if(arg.constructor==Array){o='[';for(i=0;i<arg.length;++i){v=stringify(arg[i]);if(v!='function'&&!isUndefined(v)){o+=(o!='['?',':'')+v;}else{o+=',';}}
return o+']';}else if(typeof arg.toString!='undefined'){o='{';for(i in arg){v=stringify(arg[i]);if(v!='function'&&!isUndefined(v)){o+=(o!='{'?',':'')+
i.quote()+':'+v;}}
return o+'}';}else{return;}}
return'null';case'unknown':case'undefined':return;case'string':return arg.quote();case'function':return'function';default:return String(arg);}}


(function(){var read=function(option,element){return(option)?(typeOf(option)=='function'?option(element):element.get(option)):'';};this.Tips=new Class({Implements:[Events,Options],options:{onShow:function(){this.tip.setStyle('display','block');},onHide:function(){this.tip.setStyle('display','none');},title:'title',text:function(element){return element.get('rel')||element.get('href');},showDelay:100,hideDelay:100,className:'tip-wrap',offset:{x:16,y:16},windowPadding:{x:0,y:0},fixed:false,waiAria:true},initialize:function(){var params=Array.link(arguments,{options:Type.isObject,elements:function(obj){return obj!=null;}});this.setOptions(params.options);if(params.elements)this.attach(params.elements);this.container=new Element('div',{'class':'tip'});if(this.options.id){this.container.set('id',this.options.id);if(this.options.waiAria)this.attachWaiAria();}},toElement:function(){if(this.tip)return this.tip;this.tip=new Element('div',{'class':this.options.className,styles:{position:'absolute',top:0,left:0}}).adopt(new Element('div',{'class':'tip-top'}),this.container,new Element('div',{'class':'tip-bottom'}));return this.tip;},attachWaiAria:function(){var id=this.options.id;this.container.set('role','tooltip');if(!this.waiAria){this.waiAria={show:function(element){if(id)element.set('aria-describedby',id);this.container.set('aria-hidden','false');},hide:function(element){if(id)element.erase('aria-describedby');this.container.set('aria-hidden','true');}};}
this.addEvents(this.waiAria);},detachWaiAria:function(){if(this.waiAria){this.container.erase('role');this.container.erase('aria-hidden');this.removeEvents(this.waiAria);}},attach:function(elements){$$(elements).each(function(element){var title=read(this.options.title,element),text=read(this.options.text,element);element.set('title','').store('tip:native',title).retrieve('tip:title',title);element.retrieve('tip:text',text);this.fireEvent('attach',[element]);var events=['enter','leave'];if(!this.options.fixed)events.push('move');events.each(function(value){var event=element.retrieve('tip:'+value);if(!event)event=function(event){this['element'+value.capitalize()].apply(this,[event,element]);}.bind(this);element.store('tip:'+value,event).addEvent('mouse'+value,event);},this);},this);return this;},detach:function(elements){$$(elements).each(function(element){['enter','leave','move'].each(function(value){element.removeEvent('mouse'+value,element.retrieve('tip:'+value)).eliminate('tip:'+value);});this.fireEvent('detach',[element]);if(this.options.title=='title'){var original=element.retrieve('tip:native');if(original)element.set('title',original);}},this);return this;},elementEnter:function(event,element){clearTimeout(this.timer);this.timer=(function(){this.container.empty();['title','text'].each(function(value){var content=element.retrieve('tip:'+value);var div=this['_'+value+'Element']=new Element('div',{'class':'tip-'+value}).inject(this.container);if(content)this.fill(div,content);},this);this.show(element);this.position((this.options.fixed)?{page:element.getPosition()}:event);}).delay(this.options.showDelay,this);},elementLeave:function(event,element){clearTimeout(this.timer);this.timer=this.hide.delay(this.options.hideDelay,this,element);this.fireForParent(event,element);},setTitle:function(title){if(this._titleElement){this._titleElement.empty();this.fill(this._titleElement,title);}
return this;},setText:function(text){if(this._textElement){this._textElement.empty();this.fill(this._textElement,text);}
return this;},fireForParent:function(event,element){element=element.getParent();if(!element||element==document.body)return;if(element.retrieve('tip:enter'))element.fireEvent('mouseenter',event);else this.fireForParent(event,element);},elementMove:function(event,element){this.position(event);},position:function(event){if(!this.tip)document.id(this);var size=window.getSize(),scroll=window.getScroll(),tip={x:this.tip.offsetWidth,y:this.tip.offsetHeight},props={x:'left',y:'top'},bounds={y:false,x2:false,y2:false,x:false},obj={};for(var z in props){obj[props[z]]=event.page[z]+this.options.offset[z];if(obj[props[z]]<0)bounds[z]=true;if((obj[props[z]]+tip[z]-scroll[z])>size[z]-this.options.windowPadding[z]){obj[props[z]]=event.page[z]-this.options.offset[z]-tip[z];bounds[z+'2']=true;}}
this.fireEvent('bound',bounds);this.tip.setStyles(obj);},fill:function(element,contents){if(typeof contents=='string')element.set('html',contents);else element.adopt(contents);},show:function(element){if(!this.tip)document.id(this);if(!this.tip.getParent())this.tip.inject(document.body);this.fireEvent('show',[this.tip,element]);},hide:function(element){if(!this.tip)document.id(this);this.fireEvent('hide',[this.tip,element]);}});})();


SK.UI.Tip=new Class({Extends:Tips,element:null,entered:false,initialize:function(element,title,text,options){this.element=_$(element);this.title=title;this.text=text;this.parameters=options||{};this.parent(this.element,Object.append(this.parameters,{className:'sk-tip',fixed:true,offset:this.getOffsets(),title:this.title,text:function(){return this.text;}.bind(this),onShow:function(){this.tip.fade('in');},onHide:function(){this.tip.fade('out');},}));},toElement:function(){var tip=this.parent();if(!this.isLongContent(this.title,this.text)){this.tip.setStyle('width','auto');}
return tip;},getOffsets:function(){if(this.parameters.onoffset){return this.parameters.onoffset(this.element);}else{return{x:0,y:this.element.getSize().y+10};}},isLongContent:function(title,text){return title.length>50||text.length>50;},elementEnter:function(e,element){this.entered=true;this.parent.apply(this,arguments);},elementLeave:function(e){this.entered=false;this.parent.apply(this,arguments);},elementMove:function(e){if(this.entered){this.parent(e);}}});


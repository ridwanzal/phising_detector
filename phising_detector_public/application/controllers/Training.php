<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use Sunra\PhpSimple\HtmlDomParser; // lib html parser
use stringEncode\Encode; // lib html parser
use PHPHtmlParser\Dom; // lib html parser
use FastSimpleHTMLDom\Document; // lib html parser

class Training extends CI_Controller {

	function __construct(){
		parent::__construct();		
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->library('form_validation');
		$this->load->model('Mphscan');
		$this->load->model('Mphtask');
		$this->load->model('Mphurl');
		date_default_timezone_set('Asia/Jakarta'); // default time zone indonesia
	}

	public function index(){
		// $dom = HtmlDomParser::file_get_html($_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/sample.html');
		// $ret = $dom->find('#kontak');
		// var_dump($ret);
		// $str    = "Calendrier de l'avent façon Necta!";
		// $encode = new Encode;
		// $encode->detect($str);
		// $newstr = $encode->convert($str);
		// echo $newstr;


		// $dom = new Dom;
		// $dom->loadFromFile($_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/phishing/P00001/RAW-HTML/index.php');
		// $a = $dom->find('link');
		// $found = false;
		// foreach($a as $links){
		// 	$get_value = $links->getAttribute('rel');
		// 	if($get_value == 'shortcut icon' || $get_value == ''){
		// 		$found = true;
		// 	}
		// }

		// var_dump($found);

		// $this->read_html_alert($_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/sample.html');

		$data['title_bar'] = "Home - Phising Detector";
		$data['header_page'] = "Phising Detector";
		$data['keyword'] = "Phising Detector";
		$data['breadcrumb'] = "Home";
		$data['description'] = "Home Phising Detector";
		$this->load->view('main/header',$data);
		$this->load->view('main/navbar',$data);
		$this->load->view('main/input',$data);
		$this->load->view('main/footer',$data);
	}
  
	public function phising(){
		$data['title_bar'] = "Phising - Phising Detector";
		$data['header_page'] = "Phising Detector";
		$data['keyword'] = "Phising Detector";
		$data['breadcrumb'] = "Phising";
		$data['description'] = "Home Phising Detector";
		$this->load->view('main/header', $data);
		$this->load->view('main/navbar', $data);
		$this->load->view('main/phising', $data);
		$this->load->view('main/footer', $data);
	}

	public function legitimate(){
		$data['title_bar'] = "Legitimate - Phising Detector";
		$data['header_page'] = "Phising Detector";
		$data['keyword'] = "Phising Detector";
		$data['breadcrumb'] = "Legitimate";
		$data['description'] = "Home Phising Detector";
		$this->load->view('main/header', $data);
		$this->load->view('main/navbar', $data);
		$this->load->view('main/legitimate', $data);
		$this->load->view('main/footer', $data);
	}

	public function scan(){
		$data['title_bar'] = "Scan - Phising Detector";
		$data['header_page'] = "Phising Detector";
		$data['keyword'] = "Phising Detector";
		$data['breadcrumb'] = "Scan";
		$data['description'] = "Home Phising Detector";
		$this->load->view('main/header', $data);
		$this->load->view('main/navbar', $data);
		$this->load->view('main/scan', $data);
		$this->load->view('main/footer', $data);
	}

	public function dataset(){
		$data['title_bar'] = "Dataset - Phising Detector";
		$data['header_page'] = "Phising Detector";
		$data['keyword'] = "Phising Detector";
		$data['breadcrumb'] = "Dataset";
		$data['description'] = "Home Phising Detector";

		// query a
		// $q_a = "SELECT COUNT(a.url_id) FROM  ph_url_info";
		// $result_q = $this->db->query($query_task_scan)->result();

		$this->load->view('main/header', $data);
		$this->load->view('main/navbar', $data);
		$this->load->view('main/dataset', $data);
		$this->load->view('main/footer', $data);
	}

	public function taskhistory(){
		// get task list
		$query_task = "SELECT * FROM ph_task ORDER BY task_id DESC";
		$get_task = $this->db->query($query_task);
		$result_task = $get_task->result();
		
		$data['title_bar'] = "Task History - Phising Detector";
		$data['header_page'] = "Task History";
		$data['keyword'] = "Task History";
		$data['breadcrumb'] = "Task History";
		$data['description'] = "Task History Phising Detector";
		$data['task'] = $result_task;

		$this->load->view('main/header', $data);
		$this->load->view('main/navbar', $data);
		$this->load->view('main/taskhistory', $data);
		$this->load->view('main/footer', $data);
	}

	public function tasklist_train(){
		// get task id
		$get_taskid = $this->input->post('task_id');
		$get_task_scanned =$this->input->post('task_scanned');
		
		// Phising features
		$ph_proto = $this->count_feature_phising($get_taskid, 'a.url_protocol');
		$ph_stdport = $this->count_feature_phising($get_taskid, 'a.url_standard_port');
		$ph_urlsymbol = $this->count_feature_phising($get_taskid, 'a.url_symbol');
		$ph_urlsubdomain = $this->count_feature_phising($get_taskid, 'a.url_subdomain');
		$ph_url_len = $this->count_feature_phising($get_taskid, 'a.url_length');
		$ph_url_dot_total = $this->count_feature_phising($get_taskid, 'a.url_dot_total');
		$ph_url_sensitive_char = $this->count_feature_phising($get_taskid, 'a.url_sensitive_char');
		$ph_html_login = $this->count_feature_phising($get_taskid, 'a.html_login');
		$ph_html_empty_link = $this->count_feature_phising($get_taskid, 'a.html_empty_link');
		$ph_html_length = $this->count_feature_phising($get_taskid, 'a.html_length');
		$ph_html_is_consist = $this->count_feature_phising($get_taskid, 'a.html_is_consist');
		$ph_html_jslist = $this->count_feature_phising($get_taskid, 'a.html_js_list');
		$ph_html_str_extlist = $this->count_feature_phising($get_taskid, 'a.html_link_external_list');
		$ph_html_redirect = $this->count_feature_phising($get_taskid, 'a.html_redirect');
		$ph_html_iframe = $this->count_feature_phising($get_taskid, 'a.html_iframe');
		$ph_html_favicon = $this->count_feature_phising($get_taskid, 'a.html_favicon');

		// Legitimate features
		$le_proto = $this->count_feature_legitimate($get_taskid, 'a.url_protocol');
		$le_stdport = $this->count_feature_legitimate($get_taskid, 'a.url_standard_port');
		$le_urlsymbol = $this->count_feature_legitimate($get_taskid, 'a.url_symbol');
		$le_urlsubdomain = $this->count_feature_legitimate($get_taskid, 'a.url_subdomain');
		$le_url_len = $this->count_feature_legitimate($get_taskid, 'a.url_length');
		$le_url_dot_total = $this->count_feature_legitimate($get_taskid, 'a.url_dot_total');
		$le_url_sensitive_char = $this->count_feature_legitimate($get_taskid, 'a.url_sensitive_char');
		$le_html_login = $this->count_feature_legitimate($get_taskid, 'a.html_login');
		$le_html_empty_link = $this->count_feature_legitimate($get_taskid, 'a.html_empty_link');
		$le_html_length = $this->count_feature_legitimate($get_taskid, 'a.html_length');
		$le_html_is_consist = $this->count_feature_legitimate($get_taskid, 'a.html_is_consist');
		$le_html_jslist = $this->count_feature_legitimate($get_taskid, 'a.html_js_list');
		$le_html_str_extlist = $this->count_feature_legitimate($get_taskid, 'a.html_link_external_list');
		$le_html_redirect = $this->count_feature_legitimate($get_taskid, 'a.html_redirect');
		$le_html_iframe = $this->count_feature_legitimate($get_taskid, 'a.html_iframe');
		$le_html_favicon = $this->count_feature_legitimate($get_taskid, 'a.html_favicon');

		$train_proto = ($ph_proto[0]->count - $le_proto[0]->count) / $get_task_scanned;
		$train_stdport = ($ph_stdport[0]->count - $le_stdport[0]->count) / $get_task_scanned;
		$train_urlsymbol = ($ph_urlsymbol[0]->count - $le_urlsymbol[0]->count) / $get_task_scanned;
		$train_urlsubdomain = ($ph_urlsubdomain[0]->count - $le_urlsubdomain[0]->count) / $get_task_scanned;
		$train_url_len = ($ph_url_len[0]->count - $le_url_len[0]->count) / $get_task_scanned;
		$train_url_dot_total = ($ph_url_dot_total[0]->count - $le_url_dot_total[0]->count) / $get_task_scanned;
		$train_url_sensitive_char = ($ph_url_sensitive_char[0]->count - $le_url_sensitive_char[0]->count) / $get_task_scanned;
		$train_html_login = ($ph_html_login[0]->count- $le_html_login[0]->count)/ $get_task_scanned;
		$train_html_empty_link = ($ph_html_empty_link[0]->count - $le_html_empty_link[0]->count) / $get_task_scanned;
		$train_html_length = ($ph_html_length[0]->count - $le_html_length[0]->count) / $get_task_scanned;
		$train_html_is_consist = ($ph_html_is_consist[0]->count - $le_html_is_consist[0]->count) / $get_task_scanned;
		$train_html_jslist = ($ph_html_jslist[0]->count - $le_html_jslist[0]->count) / $get_task_scanned;
		$train_html_str_extlist = ($ph_html_str_extlist[0]->count - $le_html_str_extlist[0]->count) / $get_task_scanned; 
		$train_html_redirect = ($ph_html_redirect[0]->count- $le_html_redirect[0]->count) / $get_task_scanned; 
		$train_html_iframe = ($ph_html_iframe[0]->count - $le_html_iframe[0]->count)/ $get_task_scanned; 
		$train_html_favicon = ($ph_html_favicon[0]->count- $le_html_favicon[0]->count) / $get_task_scanned; 

		$validate_train_proto = $train_proto < 0 ? 0 : $train_proto;
		$validate_train_stdport = $train_stdport < 0 ? 0 : $train_stdport;
		$validate_train_urlsymbol = $train_urlsymbol < 0 ? 0 : $train_urlsymbol;
		$validate_train_urlsubdomain = $train_urlsubdomain < 0 ? 0 : $train_urlsubdomain;
		$validate_train_url_len = $train_url_len < 0 ? 0 : $train_url_len;
		$validate_train_url_dot_total = $train_url_dot_total < 0 ? 0 : $train_url_dot_total;
		$validate_train_url_sensitive_char = $train_url_sensitive_char < 0 ? 0 : $train_url_sensitive_char;
		$validate_train_html_login = $train_html_login < 0 ? 0 : $train_html_login;
		$validate_train_html_empty_link = $train_html_empty_link < 0 ? 0 : $train_html_empty_link;
		$validate_train_html_length = $train_html_length < 0 ? 0 : $train_html_length;
		$validate_train_html_is_consist = $train_html_is_consist < 0 ? 0 : $train_html_is_consist;
		$validate_train_html_jslist = $train_html_jslist < 0 ? 0 : $train_html_jslist;
		$validate_train_html_str_extlist = $train_html_str_extlist < 0 ? 0 : $train_html_str_extlist;
		$validate_train_html_redirect = $train_html_redirect < 0 ? 0 : $train_html_redirect;
		$validate_train_html_iframe = $train_html_iframe < 0 ? 0 : $train_html_iframe;
		$validate_train_html_favicon = $train_html_favicon < 0 ? 0 : $train_html_favicon;
		
		$train_data = array(
			"task_id" => "".$get_taskid,
			"url_protocol" => "".$validate_train_proto,
			"url_favicon" => "".$validate_train_html_favicon,
			"url_standard_port" => "".$validate_train_stdport,
			"url_symbol" => "".$validate_train_urlsymbol,
			"url_subdomain"=> "".$validate_train_urlsubdomain,
			"url_length" => "".$validate_train_url_len,
			"url_dot_total" => "".$validate_train_url_dot_total,
			"url_sensitive_char" => "".$validate_train_url_sensitive_char,
			"html_login" => "".$validate_train_html_login,
			"html_empty_link" => "".$validate_train_html_empty_link,
			"html_length" => "".$validate_train_html_length,
			"html_is_consist" => "".$validate_train_html_is_consist,
			"html_js_list" => "".$validate_train_html_jslist,
			"html_link_external_list" => "".$validate_train_html_str_extlist,
			"html_redirect" => "".$validate_train_html_redirect,
			"html_iframe" => "".$validate_train_html_iframe,
			"html_favicon" => "".$validate_train_html_favicon
		);

		$this->db->insert('ph_train', $train_data);
		if($this->db->affected_rows() > 0 ){
			$query = "SELECT * FROM ph_train where task_id = $get_taskid ORDER BY train_id DESC LIMIT 1";
			$result_train  = $this->db->query($query)->result();
			$send_toview['ph_count_urlprotocol'] = $ph_proto;
			$send_toview['ph_count_urlsymbol'] = $ph_urlsymbol;
			$send_toview['ph_count_urlsubdomain'] = $ph_urlsubdomain;
			$send_toview['ph_count_urlstdport'] = $ph_stdport;
			$send_toview['ph_count_url_len'] = $ph_url_len;
			$send_toview['ph_count_urldot_total'] = $ph_url_dot_total;
			$send_toview['ph_count_url_senschar'] = $ph_url_sensitive_char;
			$send_toview['ph_count_html_login'] = $ph_html_login;
			$send_toview['ph_count_html_empty_link'] = $ph_html_empty_link;
			$send_toview['ph_count_html_length'] = $ph_html_length;
			$send_toview['ph_count_html_isconsist'] = $ph_html_is_consist;
			$send_toview['ph_count_html_jslist'] = $ph_html_jslist;
			$send_toview['ph_count_html_extlist'] = $ph_html_str_extlist;
			$send_toview['ph_count_html_redirect'] = $ph_html_redirect;
			$send_toview['ph_count_html_iframe'] = $ph_html_iframe;
			$send_toview['ph_count_html_favicon'] = $ph_html_favicon;
	
	
			$send_toview['le_count_urlprotocol'] = $le_proto;
			$send_toview['le_count_urlsymbol'] = $le_urlsymbol;
			$send_toview['le_count_urlsubdomain'] = $le_urlsubdomain;
			$send_toview['le_count_urlstdport'] = $le_stdport;
			$send_toview['le_count_url_len'] = $le_url_len;
			$send_toview['le_count_urldot_total'] = $le_url_dot_total;
			$send_toview['le_count_url_senschar'] = $le_url_sensitive_char;
			$send_toview['le_count_html_login'] = $le_html_login;
			$send_toview['le_count_html_empty_link'] = $le_html_empty_link;
			$send_toview['le_count_html_length'] = $le_html_length;
			$send_toview['le_count_html_isconsist'] = $le_html_is_consist;
			$send_toview['le_count_html_jslist'] = $le_html_jslist;
			$send_toview['le_count_html_extlist'] = $le_html_str_extlist;
			$send_toview['le_count_html_redirect'] = $le_html_redirect;
			$send_toview['le_count_html_iframe'] = $le_html_iframe;
			$send_toview['le_count_html_favicon'] = $le_html_favicon;
	
			
			$send_toview['title_bar'] = "Scan Result Task ".$get_taskid." Phising Detector";
			$send_toview['header_page'] = "Phising Detector";
			$send_toview['keyword'] = "Phising Detector";
			$send_toview['ph_train'] = $result_train;
			$send_toview['breadcrumb'] = "Dataset";
			$send_toview['description'] = "Home Phising Detector";
			$send_toview['taskid'] = $get_taskid;
	
	
			$this->load->view('main/header', $send_toview);
			$this->load->view('main/navbar', $send_toview);
			$this->load->view('main/tasktrainlist', $send_toview);
			$this->load->view('main/footer', $send_toview);
		}
	}

	public function taskhistory_detail(){
		$get_taskid = $this->input->post('task_id');
		$query_task_scan = "SELECT 
							a.task_id,
							b.sc_id,
							b.dataset_url,
							b.dataset_html_file,
							a.date_created
							FROM
							ph_task a,
							ph_scan b
							WHERE
							a.task_id = b.task_id
							and a.task_id = $get_taskid";
		$result_q = $this->db->query($query_task_scan)->result();

		$query_url_scan = "SELECT 
							c.task_id,
							b.sc_id,
							a.url_id,
							a.url_link,
							a.url_protocol,
							a.url_favicon,
							a.url_standard_port,
							a.url_symbol,
							a.url_subdomain,
							a.url_length,
							a.url_dot_total,
							a.url_sensitive_char,
							a.url_brandinfo
							FROM
							ph_url_info a,
							ph_scan b,
							ph_task c
							WHERE
							c.task_id = b.task_id 
							AND b.sc_id = a.sc_id
							AND c.task_id = $get_taskid";
		$feature_url = $this->db->query($query_url_scan)->result();

		$query_html_scan = "SELECT 
							c.task_id,
							b.sc_id,
							a.html_id,
							a.html_login,
							a.html_empty_link,
							a.html_length,
							a.html_is_consist,
							a.html_js_list,
							a.html_link_external_list,
							a.html_redirect,
							a.html_iframe,
							a.html_favicon
							FROM
							ph_html_info a,
							ph_scan b,
							ph_task c
							WHERE
							c.task_id = b.task_id 
							AND b.sc_id = a.sc_id
							AND c.task_id = $get_taskid";
		$feature_html = $this->db->query($query_html_scan)->result();


		$query_webpage_score = "SELECT
								a.task_id,
								b.sc_id, 
								(c.url_protocol +
								c.url_favicon +
								c.url_standard_port +
								c.url_symbol +
								c.url_subdomain +
								c.url_length +
								c.url_dot_total +
								c.url_sensitive_char +
								c.url_brandinfo +
								d.html_login +
								d.html_empty_link +
								d.html_length +
								d.html_is_consist +
								d.html_js_list +
								d.html_link_external_list +
								d.html_redirect +
								d.html_iframe +
								d.html_favicon ) / 22 as score
								FROM
								ph_task a,
								ph_scan b,
								ph_html_info d,
								ph_url_info c
								WHERE
								a.task_id = b.task_id AND
								b.sc_id = b.sc_id AND
								c.sc_id = b.sc_id AND
								d.sc_id = b.sc_id
								and a.task_id = 369";

		$query_score = $this->db->query($query_webpage_score)->result();

		// URL Features
		$q_proto = $this->count_feature_url($get_taskid, 'a.url_protocol');
		$q_stdport = $this->count_feature_url($get_taskid, 'a.url_standard_port');
		$q_urlsymbol = $this->count_feature_url($get_taskid, 'a.url_symbol');
		$q_urlsubdomain = $this->count_feature_url($get_taskid, 'a.url_subdomain');
		$q_url_len = $this->count_feature_url($get_taskid, 'a.url_length');
		$q_url_dot_total = $this->count_feature_url($get_taskid, 'a.url_dot_total');
		$q_url_sensitive_char = $this->count_feature_url($get_taskid, 'a.url_sensitive_char');


		// HTML Features
		$q_html_login = $this->count_feature_html($get_taskid, 'a.html_login');
		$q_html_empty_link = $this->count_feature_html($get_taskid, 'a.html_empty_link');
		$q_html_length = $this->count_feature_html($get_taskid, 'a.html_length');
		$q_html_is_consist = $this->count_feature_html($get_taskid, 'a.html_is_consist');
		$q_html_jslist = $this->count_feature_html($get_taskid, 'a.html_js_list');
		$q_html_str_extlist = $this->count_feature_html($get_taskid, 'a.html_link_external_list');
		$q_html_redirect = $this->count_feature_html($get_taskid, 'a.html_redirect');
		$q_html_iframe = $this->count_feature_html($get_taskid, 'a.html_iframe');
		$q_html_favicon = $this->count_feature_html($get_taskid, 'a.html_favicon');



		// web page score result
		

		if($result_q && $feature_url && $query_html_scan && $query_score){
			$send_toview['tasknew'] = $result_q;
			$send_toview['taskid'] = $get_taskid;

			// score
			$send_toview['web_page_score'] = $query_score;

			// url features
			$send_toview['count_urlprotocol'] = $q_proto;
			$send_toview['count_urlsymbol'] = $q_urlsymbol;
			$send_toview['count_urlsubdomain'] = $q_urlsubdomain;
			$send_toview['count_urlstdport'] = $q_stdport;
			$send_toview['count_url_len'] = $q_url_len;
			$send_toview['count_urldot_total'] = $q_url_dot_total;
			$send_toview['count_url_senschar'] = $q_url_sensitive_char;
			$send_toview['count_html_login'] = $q_html_login;
			$send_toview['count_html_empty_link'] = $q_html_empty_link;
			$send_toview['count_html_length'] = $q_html_length;
			$send_toview['count_html_isconsist'] = $q_html_is_consist;
			$send_toview['count_html_jslist'] = $q_html_jslist;
			$send_toview['count_html_extlist'] = $q_html_str_extlist;
			$send_toview['count_html_redirect'] = $q_html_redirect;
			$send_toview['count_html_iframe'] = $q_html_iframe;
			$send_toview['count_html_favicon'] = $q_html_favicon;


			$send_toview['feature_url'] = $feature_url;
			$send_toview['feature_html'] = $feature_html;
			$send_toview['title_bar'] = "Scan Result - Phising Detector";
			$send_toview['header_page'] = "Phising Detector";
			$send_toview['keyword'] = "Phising Detector";
			$send_toview['breadcrumb'] = "Dataset";
			$send_toview['description'] = "Home Phising Detector";
			$this->load->view('main/header', $send_toview);
			$this->load->view('main/navbar', $send_toview);
			$this->load->view('main/tasklist', $send_toview);
			$this->load->view('main/footer', $send_toview);
		}
	}

	public function count_feature_phising($task_id, $feature){
		$query = "SELECT
		COUNT($feature) as count
		FROM
		ph_features_phishing a,
		ph_scan_phishing b,
		ph_task c
		WHERE
		a.sc_phishing_id = b.sc_phishing_id
		AND b.task_id = c.task_id 
		AND c.task_id = $task_id
		AND $feature = 1
		AND b.scan_type = 1";
		return $this->db->query($query)->result();
	}	

	public function count_feature_legitimate($task_id, $feature){
		$query = "SELECT
		COUNT($feature) as count
		FROM
		ph_features_legitimate a,
		ph_scan_legitimate b,
		ph_task c
		WHERE
		a.sc_legitimate_id = b.sc_legitimate_id
		AND b.task_id = c.task_id 
		AND c.task_id = $task_id
		AND $feature = 1
		AND b.scan_type = 1";
		return $this->db->query($query)->result();
	}	

	public function count_feature_html($task_id, $feature){
		$query = "SELECT
			COUNT($feature) as count
			FROM
			ph_html_info a,
			ph_scan b,
			ph_task c
			WHERE
			a.sc_id = b.sc_id
			AND b.task_id = c.task_id 
			AND c.task_id = $task_id
			AND $feature = 1";

			return $this->db->query($query)->result();
	}

	public function count_feature_url($task_id, $feature){
		$query = "SELECT
					COUNT($feature) as count
					FROM
					ph_url_info a,
					ph_scan b,
					ph_task c
					WHERE
					a.sc_id = b.sc_id
					AND b.task_id = c.task_id 
					AND c.task_id = $task_id
					AND $feature = 1";

		return $this->db->query($query)->result();
	}

	public function deletealltask(){
		$sql_task = $this->Mphtask->delete();
		if(!$sql_task){
			echo 'gagal delete';
		}else{
			redirect(base_url().'train/task', 'refresh');
		}
	}

	public function deletetask(){
		$id = $this->input->post('task_id');
		$sql_task = $this->Mphtask->delete_id($id);
		if(!$sql_task){
			echo 'gagal delete';
		}else{
			redirect(base_url().'train/task', 'refresh');
		}
	}

	public function fetch_dataset(){	
			// cek apakah button analyze di klik oleh  user
			$check_ifclick = isset($_POST["analyze"]);
			$count = $this->input->post('dataset_amount');
			$main_path1;
			$main_path2;

			switch($count){
				case 10 :
					$main_path1 = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/training/10_sample/phishing/';
					$main_path2 = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/training/10_sample/legitimate/';
				break;
				case 100 :
					$main_path1 = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/training/100_sample/phishing/';
					$main_path2 = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/training/100_sample/legitimate/';
				break;
				case 250 : 
					$main_path1 = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/training/250_sample/phishing/';
					$main_path2 = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/training/250_sample/legitimate/';
				break;
				case 500 : 
					$main_path1 = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/training/500_sample/phishing/';
					$main_path2 = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/training/500_sample/legitimate/';
				break;
			}
;			if($check_ifclick){
				$files_process = scandir($main_path1); // scan direktori
                $files = array_diff($files_process, array('.', '..')); // remove current dan prev direktori yang terhitung
                
                $files_process2 = scandir($main_path2);
                $files6 = array_diff($files_process2, array('.', '..')); // remove current dan prev direktori yang terhitung

                $i = 0;
                $j = 0;
                $concater; 
                $concater2;

                $pref1 = 'P0';
                $pref2 = 'L0';

				$data;
                $data2;

                $data3;
                $data4;
                
				$pack_data_task = [];
				$check_task = false;
                
                $result_task_id; // for all traiing data global for the same task

				/* insert task terlebih dahulu */
				$pack_data_task = array(
					'task_desc' => 'task_'.date("Y-m-d H:i:s"),
					'date_created' => date("Y-m-d H:i:s"),
					'date_updated' => date("Y-m-d H:i:s"),
					'date_deleted' => date("Y-m-d H:i:s"),
					'task_scanned' => $count
				);

				/* check apakah hasil insert berhasil */
				$sql_task = $this->Mphtask->save($pack_data_task);
				if(!$sql_task){
					echo 'gagal ke db';
				}else{
					$check_task = true;
				}

				if($check_task){
					$query_task = "SELECT * FROM ph_task ORDER BY task_id DESC LIMIT 1";
					$get_last_task = $this->db->query($query_task);
					$result_task_id = $get_last_task->result_array();
				}


				if($count == 500){
					foreach($files as $file) {
						$i++;
						if($i < 10){
							$concater = '';
						}else if($i < 100){
							$concater = '';
						}else if($i < 1000){
							$concater = '';
						}else if($i <= 1000){
							$concater = '';
						}
						$files2 = scandir($main_path1.$pref1.$concater.$i);
						foreach($files2 as $file2){
							if($i <= $count){
								$files3 = scandir($main_path1.$pref1.$concater.$i.'/URL');
								foreach($files3 as $file3){
									$files4 = fopen($main_path1.$pref1.$concater.$i.'/URL/URL.txt', 'r');
									$data = fread($files4,filesize($main_path1.$pref1.$concater.$i.'/URL/URL.txt'));
									$files5 = scandir($main_path1.$pref1.$concater.$i.'/RAW-HTML');
									foreach($files5 as $file5){
										$data2 = $file5;
										if($file5){
										}
									}
									echo ''.$pref1.$main_path1.$concater.$i.$data2.'<br/>';
								}
							}else{
								break;
							}
							// echo ''.$pref1.$main_path1.$concater.$i.$data2.'<br/>';
							// echo ''.$main_path1.$pref1.$concater.$i.'/'.$file5;
						}

						
						$scan_data = array(
							"task_id" => $result_task_id[0]['task_id'],
							"dataset_id" => $pref1.$concater.$i,
							"dataset_url" => $data,
							"dataset_html_file"=> $data2,
							"scan_type" => 1
						);
					
						$sql = $this->db->insert('ph_scan_phishing', $scan_data);


						if($this->db->affected_rows() > 0){
							$sign_sc_id =  $this->db->insert_id();
							$file_path = $main_path1.$pref1.$concater.$i.'/RAW-HTML/'.$data2;
							$feature_data = array(
								"sc_phishing_id" => $sign_sc_id,
								"url_link"=> "".$data,
								"url_protocol" => "".$this->read_url_protocol($data),
								"url_favicon" => "".$this->read_html_favicon($file_path),
								"url_standard_port" => "".$this->read_url_port($data),
								"url_symbol" => "".$this->read_url_symbol($data),
								"url_subdomain"=> "".$this->read_url_subdomain($data),
								"url_length" => "".$this->read_url_length($data),
								"url_dot_total" => "".$this->read_url_dot_total($data),
								"url_sensitive_char" => "".$this->read_special_char($data),
								"html_login" => "".$this->read_html_login($file_path),
								"html_empty_link" => "".$this->read_html_empty_link($file_path),
								"html_length" => "".$this->read_html_filesize($file_path),
								"html_is_consist" => "".$this->read_consistency($file_path, $data),
								"html_js_list" => "".$this->read_html_enabled_js($file_path),
								"html_link_external_list" => "".$this->read_html_external_link($file_path),
								"html_redirect" => "".$this->read_html_redirect($file_path),
								"html_iframe" => "".$this->read_html_iframe($file_path),
								"html_favicon" => "".$this->read_html_favicon($file_path),
								"feature_type" => "0" // ini bukan fitur ini flag 

							);	
							$this->db->insert('ph_features_phishing', $feature_data);
						}

					}


					foreach($files6 as $file6) {
						$j++;
						if($j < 10){
							$concater2 = '';
						}else if($j < 100){
							$concater2 = '';
						}else if($j < 1000){
							$concater2 = '';
						}else if($j <= 1000){
							$concater2 = '';
						}
						$files7 = scandir($main_path2.$pref2.$concater2.$j);
						foreach($files7 as $file7){
							if($j <= $count){
								$files8 = scandir($main_path2.$pref2.$concater2.$j.'/URL');
								foreach($files8 as $file8){
									$files9 = fopen($main_path2.$pref2.$concater2.$j.'/URL/URL.txt', 'r');
									$data3 = fread($files9,filesize($main_path2.$pref2.$concater2.$j.'/URL/URL.txt'));
									$files10 = scandir($main_path2.$pref2.$concater2.$j.'/RAW-HTML');
									foreach($files10 as $file10){
										$data4 = $file10;
										if($file10){
										}
									}
									echo ''.$pref2.$main_path2.$concater2.$j.$data4.'<br/>';	
								}
							}
							// echo ''.$pref2.$main_path2.$concater2.$j.$data4.'<br/>';
							// echo ''.$main_path2.$pref2.$concater2.$j.'/'.$files10;
						}

						$scan_data = array(
							"task_id" => $result_task_id[0]['task_id'],
							"dataset_id" => $pref2.$concater2.$j,
							"dataset_url" => $data3,
							"dataset_html_file"=> $data4
						);
					
						$sql = $this->db->insert('ph_scan_legitimate', $scan_data);


						if($this->db->affected_rows() > 0){
							$sign_sc_id =  $this->db->insert_id();
							$file_path2 = $main_path2.$pref2.$concater2.$j.'/RAW-HTML/'.$data4;
							$feature_data = array(
								"sc_legitimate_id" => $sign_sc_id,
								"url_link"=> "".$data3,
								"url_protocol" => "".$this->read_url_protocol($data3),
								"url_favicon" => "".$this->read_html_favicon($file_path2),
								"url_standard_port" => "".$this->read_url_port($data3),
								"url_symbol" => "".$this->read_url_symbol($data3),
								"url_subdomain"=> "".$this->read_url_subdomain($data3),
								"url_length" => "".$this->read_url_length($data3),
								"url_dot_total" => "".$this->read_url_dot_total($data3),
								"url_sensitive_char" => "".$this->read_special_char($data3),
								"url_brandinfo" => "".$this->read_brandinfo($file_path, $data3),
								"html_login" => "".$this->read_html_login($file_path2),
								"html_empty_link" => "".$this->read_html_empty_link($file_path2),
								"html_length" => "".$this->read_html_filesize($file_path2),
								"html_is_consist" => "".$this->read_consistency($file_path2, $data3),
								"html_js_list" => "".$this->read_html_enabled_js($file_path2),
								"html_link_external_list" => "".$this->read_html_external_link($file_path2),
								"html_redirect" => "".$this->read_html_redirect($file_path2),
								"html_iframe" => "".$this->read_html_iframe($file_path2),
								"html_favicon" => "".$this->read_html_favicon($file_path2)

							);	
							$this->db->insert('ph_features_legitimate', $feature_data);
							
						}

					}

				}else{
					// loop for phising non 500
					foreach($files as $file) {
							$i++;
							if($i < 10){
								$concater = '000';
							}else if($i < 100){
								$concater = '00';
							}else if($i < 1000){
								$concater = '0';
							}else if($i <= 1000){
								$concater = '';
							}
							$files2 = scandir($main_path1.$pref1.$concater.$i);
							foreach($files2 as $file2){
								if($i <= $count){
									$files3 = scandir($main_path1.$pref1.$concater.$i.'/URL');
									foreach($files3 as $file3){
										$files4 = fopen($main_path1.$pref1.$concater.$i.'/URL/URL.txt', 'r');
										$data = fread($files4,filesize($main_path1.$pref1.$concater.$i.'/URL/URL.txt'));
										$files5 = scandir($main_path1.$pref1.$concater.$i.'/RAW-HTML');
										foreach($files5 as $file5){
											$data2 = $file5;
											if($file5){
											}
										}
										// echo ''.$pref1.$main_path1.$concater.$i.$data2.'<br/>';
									}
								}else{
									break;
								}
								// echo ''.$pref1.$main_path1.$concater.$i.$data2.'<br/>';
								// echo ''.$main_path1.$pref1.$concater.$i.'/'.$file5;
							}

							
							$scan_data = array(
								"task_id" => $result_task_id[0]['task_id'],
								"dataset_id" => $pref1.$concater.$i,
								"dataset_url" => $data,
								"dataset_html_file"=> $data2,
								"scan_type" => 1
							);
						
							$sql = $this->db->insert('ph_scan_phishing', $scan_data);


							if($this->db->affected_rows() > 0){
								$sign_sc_id =  $this->db->insert_id();
								$file_path = $main_path1.$pref1.$concater.$i.'/RAW-HTML/'.$data2;
								$feature_data = array(
									"sc_phishing_id" => $sign_sc_id,
									"url_link"=> "".$data,
									"url_protocol" => "".$this->read_url_protocol($data),
									"url_favicon" => "".$this->read_html_favicon($file_path),
									"url_standard_port" => "".$this->read_url_port($data),
									"url_symbol" => "".$this->read_url_symbol($data),
									"url_subdomain"=> "".$this->read_url_subdomain($data),
									"url_length" => "".$this->read_url_length($data),
									"url_dot_total" => "".$this->read_url_dot_total($data),
									"url_sensitive_char" => "".$this->read_special_char($data),
									"html_login" => "".$this->read_html_login($file_path),
									"html_empty_link" => "".$this->read_html_empty_link($file_path),
									"html_length" => "".$this->read_html_filesize($file_path),
									"html_is_consist" => "".$this->read_consistency($file_path, $data),
									"html_js_list" => "".$this->read_html_enabled_js($file_path),
									"html_link_external_list" => "".$this->read_html_external_link($file_path),
									"html_redirect" => "".$this->read_html_redirect($file_path),
									"html_iframe" => "".$this->read_html_iframe($file_path),
									"html_favicon" => "".$this->read_html_favicon($file_path),
									"feature_type" => "0" // ini bukan fitur ini flag 

								);	
								$this->db->insert('ph_features_phishing', $feature_data);
							}

						}


						foreach($files6 as $file6) {
							$j++;
							if($j < 10){
								$concater2 = '000';
							}else if($j < 100){
								$concater2 = '00';
							}else if($j < 1000){
								$concater2 = '0';
							}else if($j <= 1000){
								$concater2 = '';
							}
							$files7 = scandir($main_path2.$pref2.$concater2.$j);
							foreach($files7 as $file7){
								if($j <= $count){
									$files8 = scandir($main_path2.$pref2.$concater2.$j.'/URL');
									foreach($files8 as $file8){
										$files9 = fopen($main_path2.$pref2.$concater2.$j.'/URL/URL.txt', 'r');
										$data3 = fread($files9,filesize($main_path2.$pref2.$concater2.$j.'/URL/URL.txt'));
										$files10 = scandir($main_path2.$pref2.$concater2.$j.'/RAW-HTML');
										foreach($files10 as $file10){
											$data4 = $file10;
											if($file10){
											}
										}
										// echo ''.$pref2.$main_path2.$concater2.$j.$data4.'<br/>';	
									}
								}
								// echo ''.$pref2.$main_path2.$concater2.$j.$data4.'<br/>';
								// echo ''.$main_path2.$pref2.$concater2.$j.'/'.$files10;
							}

							$scan_data = array(
								"task_id" => $result_task_id[0]['task_id'],
								"dataset_id" => $pref2.$concater2.$j,
								"dataset_url" => $data3,
								"dataset_html_file"=> $data4
							);
						
							$sql = $this->db->insert('ph_scan_legitimate', $scan_data);


							if($this->db->affected_rows() > 0){
								$sign_sc_id =  $this->db->insert_id();
								$file_path2 = $main_path2.$pref2.$concater2.$j.'/RAW-HTML/'.$data4;
								$feature_data = array(
									"sc_legitimate_id" => $sign_sc_id,
									"url_link"=> "".$data3,
									"url_protocol" => "".$this->read_url_protocol($data3),
									"url_favicon" => "".$this->read_html_favicon($file_path2),
									"url_standard_port" => "".$this->read_url_port($data3),
									"url_symbol" => "".$this->read_url_symbol($data3),
									"url_subdomain"=> "".$this->read_url_subdomain($data3),
									"url_length" => "".$this->read_url_length($data3),
									"url_dot_total" => "".$this->read_url_dot_total($data3),
									"url_sensitive_char" => "".$this->read_special_char($data3),
									"url_brandinfo" => "".$this->read_brandinfo($file_path, $data3),
									"html_login" => "".$this->read_html_login($file_path2),
									"html_empty_link" => "".$this->read_html_empty_link($file_path2),
									"html_length" => "".$this->read_html_filesize($file_path2),
									"html_is_consist" => "".$this->read_consistency($file_path2, $data3),
									"html_js_list" => "".$this->read_html_enabled_js($file_path2),
									"html_link_external_list" => "".$this->read_html_external_link($file_path2),
									"html_redirect" => "".$this->read_html_redirect($file_path2),
									"html_iframe" => "".$this->read_html_iframe($file_path2),
									"html_favicon" => "".$this->read_html_favicon($file_path2)

								);	
								$this->db->insert('ph_features_legitimate', $feature_data);
								
							}

						}

				}
                    
			
					$send_toview['title_bar'] = "Scan Result - Phising Detector";
					$send_toview['header_page'] = "Phising Detector";	
					$send_toview['keyword'] = "Phising Detector";
					$send_toview['breadcrumb'] = "Dataset";
					$send_toview['taskid'] = $result_task_id[0]['task_id'];
					$send_toview['task_scanned'] = $count;
					$send_toview['description'] = "Home Phising Detector";
					$this->load->view('main/header', $send_toview);
					$this->load->view('main/navbar', $send_toview);
					$this->load->view('main/input', $send_toview);
					$this->load->view('main/footer', $send_toview);
		}
	}

	// URL Feature Extraction Modules


	public function read_brandinfo($file, $uri){
		// check on data uri/url or title
		$dom = new Dom;
		$get_host = parse_url($uri, PHP_URL_HOST); 
		$dom->setOptions([
			'cleanupInput' => false,
			'removeScripts' => true,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$title = $dom->find('title');
		$found = false;
		foreach($title as $t){
			$get_value = $t->innerHtml;
			if($get_value == $get_host || strpos($get_value, $get_host) !== false){
				$found = true;
			}
		}

		if($found){
			return 1;
		}else{
			return 0;
		}
	}

	public function read_html($content){
		$process = file_get_contents($content);
		echo $process;
	}

	public function read_url_protocol($uri){
		$check_protocol =  parse_url($uri, PHP_URL_SCHEME);
		$result = 0;
		if($check_protocol != 'https'){
			$result = 1;
		}
		return $result;
	}

	public function read_url_port($uri){
		$check_protocol =  parse_url($uri, PHP_URL_SCHEME);
		$result = 0;
		if($check_protocol == 'http'){
			$result = 1;
		}
		return $result;
	}

	public function read_url_length($uri){
		$check = strlen($uri);
		$result = 0;
		if($check > 100){
			$result = 1;
		}
		return $result;
	}

	public function read_url_dot_total($uri){
		$split = explode (".", $uri);
		$dot_in_total = sizeof($split);
		$result = 0;
		if($dot_in_total >= 3){
				$result = 1;
		}
		return $result;
	}

	/*
		Deteksi special character di URI
	*/
	public function read_url_symbol($uri){
		$result = 0 ;
		if (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $uri))
			{
				$result = 1;
			// one or more of the 'special characters' found in $string
			}
		return $result;
	}


	public function read_url_subdomain($uri){
		$result = 0 ;
		$parsed_url = parse_url($uri, PHP_URL_HOST);
		if($parsed_url != null || $parsed_url != ''){
			$check_contain_sub = explode('.', $parsed_url);
			if($check_contain_sub[0]){
				$result = 1;
			}else{
				$result = 0;
			}
		}else{
			$result = 0;
		}

		return $result;
	}

	/*
		Check apakah web memiliki Sensitive vocabulary
	 */

	public function read_special_char($uri){
		$result = 0 ;
		$vocab_phishing = array("secure", 
								 "account",
								 "login", "ebayisapi",
								 "signin", "banking", "confirm");
			if (in_array("uri", $vocab_phishing))
			{
				$result = 1 ;
			}
		return $result;
	}
	
	/*
		Check apakah web memiliki favicon, kebanyakan web phishing 
		dibuat secara tidak profesional dan tidak menampilkan favicon
	 */
	
	public function read_html_favicon($file){
		// echo $file;
		$dom = new Dom;
		$dom->setOptions([
			'cleanupInput' => false,
			'removeScripts' => true,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$a = $dom->find('link');
		$found = false;
		foreach($a as $links){
			$get_value = $links->getAttribute('rel');
			if($get_value == 'shortcut icon'){
				$found = false;
			}else{
				$found = true;
			}
		}

		if($found){
			return 0; // kalo ketemu bukan phishing
		}else{
			return 1; // kalo ketemu phishing
		}
	}


	/*
		Check kalo ad iframe, ini biasany untuk inject view dari luar
		berbahaya
	 */
	public function read_html_iframe($file){
		$dom = new Dom;
		$dom->setOptions([
			'cleanupInput' => false,
			'removeScripts' => true,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$a = $dom->find('iframe');
		$found = false;
		foreach($a as $links){
			$get_value = $links->getAttribute('src');
			if($get_value !="" || $get_value == ""){
				$found = true;
			}else{
				$found = false;
			}
		}

		if($found){
			return 1; // kalo ketemu phishing
		}else{
			return 0; // kalo ketemu bukan phishing
		}	
	}

	/*
		Check  ukran file jika lebih besar dr 100
	 */
	public function read_html_filesize($file){
		$result = 0;
		$size = filesize($file);
		if($size < 102400){
			$result = 1;
		}

		return $result;
	}

	/*
		Check kalo a href value ny kosong 
	 */
	public function read_html_empty_link($file){
		$dom = new Dom;
		$dom->setOptions([
			'cleanupInput' => false,
			'removeScripts' => true,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$a = $dom->find('a');
		$found = false;
		foreach($a as $links){
			$get_value = $links->getAttribute('href');
			if($get_value == "" || $get_value == null){
				$found = true;
			}else{
				$found = false;
			}
		}

		if($found){
			return 1;
		}else{
			return 0;
		}	
	}

	/*
		Check kalo ado auto redirect 
	*/
	public function read_html_redirect($file){
		$dom = new Dom;
		$dom->setOptions([
			'cleanupInput' => false,
			'removeScripts' => true,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$a = $dom->find('meta');
		$found = false;
		foreach($a as $links){
			$get_value = $links->getAttribute('http-equiv');
			if($get_value == "refresh"){
				$found = true;
			}else{
				$found = false;
			}
		}

		if($found){
			return 1;
		}else{
			return 0;
		}	
	}

	public function read_html_enabled_js($file){
		$dom = new Dom;
		$dom->setOptions([
			'cleanupInput' => false,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$a = $dom->find('script');
		$found = false;
		foreach($a as $links){
			if($links){
				$found = true;
			}else{
				$found = false;
			}
		}

		if($found){
			return 1;
		}else{
			return 0;
		}	
	}
	

	public function read_html_external_link($file){
		$dom = new Dom;
		$dom->setOptions([
			'cleanupInput' => false,
			'removeScripts' => true,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$a = $dom->find('a');
		$found = false;
		foreach($a as $links){
			$get_value = $links->getAttribute('href');
			if(substr( $get_value, 0, 7 ) === "http://" || substr( $get_value, 0, 8 ) === "https://" ){
				$found = true;
			}else{
				$found = false;
			}
		}
		if($found){
			return 1;
		}else{
			return 0;
		}
	}

	public function read_consistency($file, $uri){
		// check on data uri/url or title
		$dom = new Dom;
		$get_host = parse_url($uri, PHP_URL_HOST); 
		$dom->setOptions([
			'cleanupInput' => false,
			'removeScripts' => true,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$title = $dom->find('title');
		$found = false;
		foreach($title as $t){
			$get_value = $t->innerHtml;
			if($get_value == $get_host || strpos($get_value, $get_host) !== false){
				$found = true;
			}else{
				$found = false;
			}
		}

		if($found){
			return 0;
		}else{
			return 1;
		}
	}

	public function read_html_login($file){
		$dom = new Dom;
		$dom->setOptions([
			'cleanupInput' => false,
			'removeScripts' => true,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$a = $dom->find('a');
		$found = false;
		foreach($a as $links){
			$get_value = $links->getAttribute('href');
			$word1 = 'login';
			$word2 = 'signin';
			$word3 = "Sign";
			if(strpos($get_value, $word1) !== false || strpos($get_value, $word2) !== false || strpos($get_value, $word3) !== false){
				$found = true;
			} else{
				$found = false;
			}
		}
		if($found){
			return 1;
		}else{
			return 0;
		}
	}
	

	public function read_html_mouseover($uri){
		$dom = new Dom;
		$dom->setOptions([
			'cleanupInput' => false,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$a = $dom->find('script');
		$found = false;
		foreach($a as $links){
			if($links){
				$found = true;
			}else{
				$found = false;
			}
		}

		if($found){
			return 1;
		}else{
			return 0;
		}	
	}


	public function read_html_popup($uri){
		$dom = new Dom;
		$dom->setOptions([
			'cleanupInput' => false,
			'htmlSpecialCharsDecode' => false,
			'strict' => false,
			'whitespaceTextNode' => false
		]);
		$dom->loadFromFile($file);
		$a = $dom->find('script');
		$found = false;
		foreach($a as $links){
			if($links){
				$found = true;
			}else{
				$found = false;
			}
		}

		if($found){
			return 1;
		}else{
			return 0;
		}	
	}


}

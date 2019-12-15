<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use Sunra\PhpSimple\HtmlDomParser; // lib html parser
use stringEncode\Encode; // lib html parser
use PHPHtmlParser\Dom; // lib html parser
use FastSimpleHTMLDom\Document; // lib html parser

class Main extends CI_Controller {

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
							a.html_alert,
							a.html_login,
							a.html_empty_link,
							a.html_length,
							a.html_is_consist,
							a.html_js_list,
							a.html_string_embed,
							a.html_link_external_list,
							a.html_redirect,
							a.html_iframe,
							a.html_mouseover,
							a.html_popup,
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
								d.html_alert +
								d.html_login +
								d.html_empty_link +
								d.html_length +
								d.html_is_consist +
								d.html_js_list +
								d.html_string_embed +
								d.html_link_external_list +
								d.html_redirect +
								d.html_iframe +
								d.html_mouseover +
								d.html_popup +
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
		$q_html_alert = $this->count_feature_html($get_taskid, 'a.html_alert');
		$q_html_login = $this->count_feature_html($get_taskid, 'a.html_login');
		$q_html_empty_link = $this->count_feature_html($get_taskid, 'a.html_empty_link');
		$q_html_length = $this->count_feature_html($get_taskid, 'a.html_length');
		$q_html_is_consist = $this->count_feature_html($get_taskid, 'a.html_is_consist');
		$q_html_jslist = $this->count_feature_html($get_taskid, 'a.html_js_list');
		$q_html_str_embed = $this->count_feature_html($get_taskid, 'a.html_string_embed');
		$q_html_str_extlist = $this->count_feature_html($get_taskid, 'a.html_link_external_list');
		$q_html_redirect = $this->count_feature_html($get_taskid, 'a.html_redirect');
		$q_html_iframe = $this->count_feature_html($get_taskid, 'a.html_iframe');
		$q_html_mosueover = $this->count_feature_html($get_taskid, 'a.html_mouseover');
		$q_html_popup = $this->count_feature_html($get_taskid, 'a.html_popup');
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


			// html features
			$send_toview['count_html_alert'] = $q_html_alert;
			$send_toview['count_html_login'] = $q_html_login;
			$send_toview['count_html_empty_link'] = $q_html_empty_link;
			$send_toview['count_html_length'] = $q_html_length;
			$send_toview['count_html_isconsist'] = $q_html_is_consist;
			$send_toview['count_html_jslist'] = $q_html_jslist;
			$send_toview['count_html_str_embed'] = $q_html_str_embed;
			$send_toview['count_html_extlist'] = $q_html_str_extlist;
			$send_toview['count_html_redirect'] = $q_html_redirect;
			$send_toview['count_html_iframe'] = $q_html_iframe;
			$send_toview['count_html_mouseove'] = $q_html_mosueover;
			$send_toview['count_html_popup'] = $q_html_popup;
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
			redirect(base_url().'task', 'refresh');
		}
	}

	public function fetch_dataset(){	
			// cek apakah button analyze di klik oleh  user
			$check_ifclick = isset($_POST["analyze"]);
			$main_path = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/phishing/';
;			if($check_ifclick){
				$files_process = scandir($main_path); // scan direktori
				$files = array_diff($files_process, array('.', '..')); // remove current dan prev direktori yang terhitung
				$i = 0;
				$concater;
				$data;
				$data2;
				$pack_data = [];
				$pack_data_task = [];
				$pack_data_url = [];
				$check_task = false;
				$result_task_id;

				/* insert task terlebih dahulu */
				$pack_data_task = array(
					'task_desc' => 'task_'.date("Y-m-d H:i:s"),
					'date_created' => date("Y-m-d H:i:s"),
					'date_updated' => date("Y-m-d H:i:s"),
					'date_deleted' => date("Y-m-d H:i:s"),
					'task_scanned' => sizeof($files)
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
						$files2 = scandir($main_path.'P0'.$concater.$i);
						foreach($files2 as $file2){
							if($i <= 1000){
								$files3 = scandir($main_path.'P0'.$concater.$i.'/URL');
								foreach($files3 as $file3){
									$files4 = fopen($main_path.'P0'.$concater.$i.'/URL/URL.txt', 'r');
									$data = fread($files4,filesize($main_path.'P0'.$concater.$i.'/URL/URL.txt'));
									$files5 = scandir($main_path.'P0'.$concater.$i.'/RAW-HTML');
									foreach($files5 as $file5){
										$data2 = $file5;
										if($file5){
										}
									}
									// echo ''.'P0'.$concater.$i.$data2.'\n';
								}
							}
							// echo ''.$main_path.'P0'.$concater.$i.'/'.$file5;
						}

						
						$scan_data = array(
							"task_id" => $result_task_id[0]['task_id'],
							"dataset_id" => 'P0'.$concater.$i,
							"dataset_url" => $data,
							"dataset_html_file"=> $data2
						);
					
						$sql = $this->db->insert('ph_scan', $scan_data);


						if($this->db->affected_rows() > 0){
							$sign_sc_id =  $this->db->insert_id();
							$file_path = $main_path.'P0'.$concater.$i.'/RAW-HTML/'.$data2;
							$html_data = array(
								"sc_id" => $sign_sc_id,
								"html_alert" => "".$this->read_html_alert($file_path),
								"html_login" => "".$this->read_html_login($file_path),
								"html_empty_link" => "".$this->read_html_empty_link($file_path),
								"html_length" => "".$this->read_html_filesize($file_path),
								"html_is_consist" => "".$this->read_consistency($file_path, $data),
								"html_js_list" => "".$this->read_html_enabled_js($file_path),
								"html_string_embed" => "1",
								"html_link_external_list" => "".$this->read_html_external_link($file_path),
								"html_redirect" => "".$this->read_html_redirect($file_path),
								"html_iframe" => "".$this->read_html_iframe($file_path),
								"html_mouseover" => "1",
								"html_popup" => "1",
								"html_favicon" => "".$this->read_html_favicon($file_path)

							);	
							$this->db->insert('ph_html_info', $html_data);

							$url_data = array(
								"sc_id" => $sign_sc_id,
								"url_link"=> "".$data,
								"url_protocol" => "".$this->read_url_protocol($data),
								"url_favicon" => "".$this->read_html_favicon($file_path),
								"url_standard_port" => "".$this->read_url_port($data),
								"url_symbol" => "".$this->read_url_symbol($data),
								"url_subdomain"=> "".$this->read_url_subdomain($data),
								"url_length" => "".$this->read_url_length($data),
								"url_dot_total" => "".$this->read_url_dot_total($data),
								"url_sensitive_char" => "".$this->read_special_char($data),
								"url_brandinfo" => "".$this->read_brandinfo($file_path, $data),
							);
							$this->db->insert('ph_url_info', $url_data);
						}

					}
					
					$task_id = $result_task_id[0]['task_id'];
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
										and a.task_id = $task_id";
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
										AND c.task_id = $task_id";
					$feature_url = $this->db->query($query_url_scan)->result();

					$count_task = "";
					
					if($result_q){
						$send_toview['tasknew'] = $result_q;
						$send_toview['feature_url'] = $feature_url;
						$send_toview['title_bar'] = "Scan Result - Phising Detector";
						$send_toview['header_page'] = "Phising Detector";
						$send_toview['keyword'] = "Phising Detector";
						$send_toview['breadcrumb'] = "Dataset";
						$send_toview['description'] = "Home Phising Detector";
						$this->load->view('main/header', $send_toview);
						$this->load->view('main/navbar', $send_toview);
						$this->load->view('main/input', $send_toview);
						$this->load->view('main/footer', $send_toview);
					}
			}
	}

	public function count_list($file){
		
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

	public function read_url_symbol($uri){
		$result = 0;
		if ( urlencode(urldecode($uri)) === $uri){
			$result = 1;
		}
		return $result;
	}

	
	public function read_url_subdomain($uri){
		$result = 0 ;
		$parsed_url = parse_url($uri);
		$host = explode('.', $parsed_url['host']);
		$check_subbdomain = $host[0];
		if($check_subbdomain != ""){	
			$result = 1;
		}
		return $result;
	}

	public function read_special_char($uri){
		$result = 0 ;
		if (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $uri))
			{
				$result = 1;
			// one or more of the 'special characters' found in $string
		}
		return $result;
	}
	

	
	// HTML Feature Extraction Modules
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
			return 1;
		}else{
			return 0;
		}
	}


	public function read_html_alert($file){
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
			if($get_value == 'shortcut icon' || $get_value == ''){
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
			return 1;
		}else{
			return 0;
		}	
	}

	public function read_html_filesize($file){
		$result = 0;
		$size = filesize($file);
		if($size > 102400){
			$result = 1;
		}

		return $result;
	}

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
	
	public function checkRemoteFile($uri)
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$uri);
		// don't download content
		curl_setopt($ch, CURLOPT_NOBODY, 1);
		curl_setopt($ch, CURLOPT_FAILONERROR, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		if(curl_exec($ch)!==FALSE)
		{
			return true;
		}
		else
		{
			return false;
		}
	}





	


}

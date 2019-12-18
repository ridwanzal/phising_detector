<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use Sunra\PhpSimple\HtmlDomParser; // lib html parser
use stringEncode\Encode; // lib html parser
use PHPHtmlParser\Dom; // lib html parser
use FastSimpleHTMLDom\Document; // lib html parser

class Phishing extends CI_Controller {

	function __construct(){
		parent::__construct();		
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->library('form_validation');
		$this->load->model('Mphscan');
        $this->load->model('Mphtask');
        $this->load->model('Mphschedule');
		$this->load->model('Mphurl');
		date_default_timezone_set('Asia/Jakarta'); // default time zone indonesia
    }

    public function index(){
        $sql = "SELECT * FROM ph_task";
        $taskall = $this->db->query($sql)->result();
        $data['title_bar'] = "Phising - Phising Detector";
        $data['header_page'] = "Phising Detector";
        $data['keyword'] = "Phising Detector";
        $data['breadcrumb'] = "Phising";
        $data['taskall'] = $taskall;
        $data['description'] = "Home Phising Detector";
        $this->load->view('main/header', $data);
        $this->load->view('main/navbar', $data);
        $this->load->view('main/phising', $data);
        $this->load->view('main/footer', $data);
	}

	public function testlist(){
		// get task list
		$query_task = "SELECT * FROM ph_schedule WHERE sch_type = 'phishing' ORDER BY sch_id DESC";
		$get_task = $this->db->query($query_task);
		$result_task = $get_task->result();
		
		$data['title_bar'] = "Test List - Phising Detector";
		$data['header_page'] = "Task History";
		$data['keyword'] = "Test List History";
		$data['breadcrumb'] = "Test List History";
		$data['description'] = "Test List History Phising Detector";
		$data['task'] = $result_task;

		$this->load->view('main/header', $data);
		$this->load->view('main/navbar', $data);
		$this->load->view('main/phisinglist', $data);
		$this->load->view('main/footer', $data);
	}

	public function deletealltask(){
		$type = 'phishing';
		$sql_task = $this->Mphschedule->delete($type);
		if(!$sql_task){
			echo 'gagal delete';
		}else{
			redirect(base_url().'phishing/testlist', 'refresh');
		}
	}

	public function deletetask(){
		$id = $this->input->post('sch_id');
		$type = 'phishing';
		$sql_task = $this->Mphschedule->delete_id($id, $type);
		if(!$sql_task){
			echo 'gagal delete';
		}else{
			redirect(base_url().'phishing/testlist', 'refresh');
		}
	}

	public function fetch_phishing(){
		$sqltask = "SELECT * FROM ph_task";
		$taskall = $this->db->query($sqltask)->result();
        $check_ifclick = isset($_POST["runtest"]);
        $count = $this->input->post('dataset_amount');
        $task_id = $this->input->post('task_id');
        switch($count){
            case 10 :
                $main_path1 = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/testing/10_sample/phishing/';
            break;
            case 100 :
                $main_path1 = $_SERVER['DOCUMENT_ROOT'].'/phising_detector/phising_detector_public/assets/testing/100_sample/phishing/';
            break;
        }

        if($check_ifclick){
            $files_process = scandir($main_path1);
            $files = array_diff($files_process, array('.', '..')); // remove current dan prev direktori yang terhitung
            $i = 0;
            $concater; 
            $pref1 = 'P0';
            $data;
            $data2;
            $result_task_id;

            $pack_data_task = array(
                'sch_desc' => 'task_'.date("Y-m-d H:i:s"),
                'date_created' => date("Y-m-d H:i:s"),
                'date_updated' => date("Y-m-d H:i:s"),
                'date_deleted' => date("Y-m-d H:i:s"),
                'sch_scanned' => sizeof($files),
                'sch_type' => 'phishing',
                'task_id' => $task_id
            );


            $sql_task = $this->Mphschedule->save($pack_data_task);
            if(!$sql_task){
                echo 'gagal ke db';
            }else{
                $check_task = true;
            }

            if($check_task){
                $query_task = "SELECT * FROM ph_schedule WHERE sch_type = 'phishing' ORDER BY sch_id DESC LIMIT 1";
                $get_last_task = $this->db->query($query_task);
                $result_task_id = $get_last_task->result_array();
            }

				// loop for phising
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
                        "sch_id" => $result_task_id[0]['sch_id'],
                        "dataset_id" => $pref1.$concater.$i,
                        "dataset_url" => $data,
                        "dataset_html_file"=> $data2,
                    );
                
                    $sql = $this->db->insert('ph_scan_phishing_test', $scan_data);


                    if($this->db->affected_rows() > 0){
                        $sign_sc_id =  $this->db->insert_id();
                        $file_path = $main_path1.$pref1.$concater.$i.'/RAW-HTML/'.$data2;
                        $feature_data = array(
							"sc_phishing_test_id" => $sign_sc_id,
							"sch_id" => $result_task_id[0]['sch_id'],
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
                            "html_alert" => "".$this->read_html_alert($file_path),
                            "html_login" => "".$this->read_html_login($file_path),
                            "html_empty_link" => "".$this->read_html_empty_link($file_path),
                            "html_length" => "".$this->read_html_filesize($file_path),
                            "html_is_consist" => "".$this->read_consistency($file_path, $data),
                            "html_js_list" => "".$this->read_html_enabled_js($file_path),
                            "html_string_embed" => "0",
                            "html_link_external_list" => "".$this->read_html_external_link($file_path),
                            "html_redirect" => "".$this->read_html_redirect($file_path),
                            "html_iframe" => "".$this->read_html_iframe($file_path),
                            "html_mouseover" => "0",
                            "html_popup" => "0",
                            "html_favicon" => "".$this->read_html_favicon($file_path),
                            "feature_type" => 2
                        );	
                        $this->db->insert('ph_features_phishing_test', $feature_data);
                    }

				}
				
           

                $send_toview['title_bar'] = "Testing Result - Phising Detector";
                $send_toview['header_page'] = "Phising Detector";	
                $send_toview['keyword'] = "Phising Detector";
				$send_toview['breadcrumb'] = "Dataset";
				$send_toview['taskall'] = $taskall;
				$send_toview['schid'] = $result_task_id[0]['sch_id'];
				$send_toview['task_id'] = $task_id;
                $send_toview['task_scanned'] = $count;
                $send_toview['description'] = "Home Phising Detector";
                $this->load->view('main/header', $send_toview);
                $this->load->view('main/navbar', $send_toview);
                $this->load->view('main/phising', $send_toview);
                $this->load->view('main/footer', $send_toview);
        }
	}
	
	public function phishingresult(){
		$get_schedule_id = $this->input->post('sch_id');
		$get_taskid = $this->input->post('task_id');
		$query_task_scan = "SELECT 
							a.sch_id,
							b.sc_phishing_test_id,
							b.dataset_url,
							b.dataset_html_file,
							a.date_created
							FROM
							ph_schedule a,
							ph_scan_phishing_test b
							WHERE
							a.sch_id = b.sch_id AND
							a.sch_type = 'phishing'
							and a.sch_id = $get_schedule_id";
		$result_q = $this->db->query($query_task_scan)->result();

		$query_features = "SELECT *
							FROM
							ph_features_phishing_test
							WHERE
							sch_id = $get_schedule_id";
		$features = $this->db->query($query_features)->result();

		$query_train = "SELECT *
						FROM
						ph_train
						where task_id = $get_taskid 
						ORDER BY train_id DESC 
						LIMIT 1";

		$score_features_train = $this->db->query($query_train)->result();

		$query_testing = "SELECT 
		a.sc_phishing_test_id,
		a.dataset_url ,
		IF(b.url_protocol > 0, c.url_protocol, 0) as a1,
		IF(b.url_length > 0, c.url_length, 0) as a2,
		IF(b.url_dot_total > 0, c.url_dot_total, 0) as a3,
		IF(b.url_brandinfo > 0, c.url_brandinfo, 0) as a4,
		IF(b.url_link > 0, c.url_link, 0) as a5,
		IF(b.url_sensitive_char > 0, c.url_sensitive_char, 0) as a6,
		IF(b.url_standard_port > 0, c.url_standard_port, 0) as a7,
		IF(b.url_subdomain > 0, c.url_subdomain, 0) as a8,
		IF(b.url_symbol > 0, c.url_symbol, 0) as a9,
		IF(b.html_alert > 0, c.html_alert, 0) as a10,
		IF(b.html_empty_link > 0, c.html_empty_link, 0) as a11,
		IF(b.html_iframe > 0, c.html_iframe, 0) as a12,
		IF(b.html_is_consist > 0, c.html_is_consist, 0) as a13,
		IF(b.html_js_list > 0, c.html_js_list, 0) as a14,
		IF(b.html_length > 0, c.html_length, 0) as a15,
		IF(b.html_link_external_list > 0, c.html_link_external_list, 0) as a16,
		IF(b.html_login > 0, c.html_login, 0) as a17,
		IF(b.html_mouseover > 0, c.html_mouseover, 0) as a18,
		(
				IF(b.url_protocol > 0, c.url_protocol, 0) +
				IF(b.url_length > 0, c.url_length, 0) +
				IF(b.url_dot_total > 0, c.url_dot_total, 0) +
				IF(b.url_brandinfo > 0, c.url_brandinfo, 0) +
				IF(b.url_link > 0, c.url_link, 0) +
				IF(b.url_sensitive_char > 0, c.url_sensitive_char, 0) +
				IF(b.url_standard_port > 0, c.url_standard_port, 0) +
				IF(b.url_subdomain > 0, c.url_subdomain, 0) +
				IF(b.url_symbol > 0, c.url_symbol, 0) +
				IF(b.html_alert > 0, c.html_alert, 0)  +
				IF(b.html_empty_link > 0, c.html_empty_link, 0) +
				IF(b.html_iframe > 0, c.html_iframe, 0) +
				IF(b.html_is_consist > 0, c.html_is_consist, 0) +
				IF(b.html_js_list > 0, c.html_js_list, 0) +
				IF(b.html_length > 0, c.html_length, 0) +
				IF(b.html_link_external_list > 0, c.html_link_external_list, 0) +
				IF(b.html_login > 0, c.html_login, 0) + 
				IF(b.html_mouseover > 0, c.html_mouseover, 0)
		) / (
			IF(b.url_protocol > 0, 1, 0) +
				IF(b.url_length > 0,1, 0) +
				IF(b.url_dot_total > 0, 1, 0) +
				IF(b.url_brandinfo > 0, 1, 0) +
				IF(b.url_link > 0, 1, 0) +
				IF(b.url_sensitive_char > 0, 1, 0) +
				IF(b.url_standard_port > 0, 1, 0) +
				IF(b.url_subdomain > 0, 1, 0) +
				IF(b.url_symbol > 0, 1, 0) +
				IF(b.html_alert > 0, 1, 0)  +
				IF(b.html_empty_link > 0,1, 0) +
				IF(b.html_iframe > 0, 1, 0) +
				IF(b.html_is_consist > 0, 1, 0) +
				IF(b.html_js_list > 0, 1, 0) +
				IF(b.html_length > 0, 1, 0) +
				IF(b.html_link_external_list > 0, 1, 0) +
				IF(b.html_login > 0, 1, 0) + 
				IF(b.html_mouseover > 0, 1, 0)
		) as score,
			IF((
					IF(b.url_protocol > 0, c.url_protocol, 0) +
					IF(b.url_length > 0, c.url_length, 0) +
					IF(b.url_dot_total > 0, c.url_dot_total, 0) +
					IF(b.url_brandinfo > 0, c.url_brandinfo, 0) +
					IF(b.url_link > 0, c.url_link, 0) +
					IF(b.url_sensitive_char > 0, c.url_sensitive_char, 0) +
					IF(b.url_standard_port > 0, c.url_standard_port, 0) +
					IF(b.url_subdomain > 0, c.url_subdomain, 0) +
					IF(b.url_symbol > 0, c.url_symbol, 0) +
					IF(b.html_alert > 0, c.html_alert, 0)  +
					IF(b.html_empty_link > 0, c.html_empty_link, 0) +
					IF(b.html_iframe > 0, c.html_iframe, 0) +
					IF(b.html_is_consist > 0, c.html_is_consist, 0) +
					IF(b.html_js_list > 0, c.html_js_list, 0) +
					IF(b.html_length > 0, c.html_length, 0) +
					IF(b.html_link_external_list > 0, c.html_link_external_list, 0) +
					IF(b.html_login > 0, c.html_login, 0) + 
					IF(b.html_mouseover > 0, c.html_mouseover, 0)
			) / (
				IF(b.url_protocol > 0, 1, 0) +
					IF(b.url_length > 0,1, 0) +
					IF(b.url_dot_total > 0, 1, 0) +
					IF(b.url_brandinfo > 0, 1, 0) +
					IF(b.url_link > 0, 1, 0) +
					IF(b.url_sensitive_char > 0, 1, 0) +
					IF(b.url_standard_port > 0, 1, 0) +
					IF(b.url_subdomain > 0, 1, 0) +
					IF(b.url_symbol > 0, 1, 0) +
					IF(b.html_alert > 0, 1, 0)  +
					IF(b.html_empty_link > 0,1, 0) +
					IF(b.html_iframe > 0, 1, 0) +
					IF(b.html_is_consist > 0, 1, 0) +
					IF(b.html_js_list > 0, 1, 0) +
					IF(b.html_length > 0, 1, 0) +
					IF(b.html_link_external_list > 0, 1, 0) +
					IF(b.html_login > 0, 1, 0) + 
					IF(b.html_mouseover > 0, 1, 0)
			) >= 0 AND
			(
					IF(b.url_protocol > 0, c.url_protocol, 0) +
					IF(b.url_length > 0, c.url_length, 0) +
					IF(b.url_dot_total > 0, c.url_dot_total, 0) +
					IF(b.url_brandinfo > 0, c.url_brandinfo, 0) +
					IF(b.url_link > 0, c.url_link, 0) +
					IF(b.url_sensitive_char > 0, c.url_sensitive_char, 0) +
					IF(b.url_standard_port > 0, c.url_standard_port, 0) +
					IF(b.url_subdomain > 0, c.url_subdomain, 0) +
					IF(b.url_symbol > 0, c.url_symbol, 0) +
					IF(b.html_alert > 0, c.html_alert, 0)  +
					IF(b.html_empty_link > 0, c.html_empty_link, 0) +
					IF(b.html_iframe > 0, c.html_iframe, 0) +
					IF(b.html_is_consist > 0, c.html_is_consist, 0) +
					IF(b.html_js_list > 0, c.html_js_list, 0) +
					IF(b.html_length > 0, c.html_length, 0) +
					IF(b.html_link_external_list > 0, c.html_link_external_list, 0) +
					IF(b.html_login > 0, c.html_login, 0) + 
					IF(b.html_mouseover > 0, c.html_mouseover, 0)
			) / (
				IF(b.url_protocol > 0, 1, 0) +
					IF(b.url_length > 0,1, 0) +
					IF(b.url_dot_total > 0, 1, 0) +
					IF(b.url_brandinfo > 0, 1, 0) +
					IF(b.url_link > 0, 1, 0) +
					IF(b.url_sensitive_char > 0, 1, 0) +
					IF(b.url_standard_port > 0, 1, 0) +
					IF(b.url_subdomain > 0, 1, 0) +
					IF(b.url_symbol > 0, 1, 0) +
					IF(b.html_alert > 0, 1, 0)  +
					IF(b.html_empty_link > 0,1, 0) +
					IF(b.html_iframe > 0, 1, 0) +
					IF(b.html_is_consist > 0, 1, 0) +
					IF(b.html_js_list > 0, 1, 0) +
					IF(b.html_length > 0, 1, 0) +
					IF(b.html_link_external_list > 0, 1, 0) +
					IF(b.html_login > 0, 1, 0) + 
					IF(b.html_mouseover > 0, 1, 0)
			) <= 0.3
			, 'Phishing', 'Legitimate') as threshold1,
			IF((
					IF(b.url_protocol > 0, c.url_protocol, 0) +
					IF(b.url_length > 0, c.url_length, 0) +
					IF(b.url_dot_total > 0, c.url_dot_total, 0) +
					IF(b.url_brandinfo > 0, c.url_brandinfo, 0) +
					IF(b.url_link > 0, c.url_link, 0) +
					IF(b.url_sensitive_char > 0, c.url_sensitive_char, 0) +
					IF(b.url_standard_port > 0, c.url_standard_port, 0) +
					IF(b.url_subdomain > 0, c.url_subdomain, 0) +
					IF(b.url_symbol > 0, c.url_symbol, 0) +
					IF(b.html_alert > 0, c.html_alert, 0)  +
					IF(b.html_empty_link > 0, c.html_empty_link, 0) +
					IF(b.html_iframe > 0, c.html_iframe, 0) +
					IF(b.html_is_consist > 0, c.html_is_consist, 0) +
					IF(b.html_js_list > 0, c.html_js_list, 0) +
					IF(b.html_length > 0, c.html_length, 0) +
					IF(b.html_link_external_list > 0, c.html_link_external_list, 0) +
					IF(b.html_login > 0, c.html_login, 0) + 
					IF(b.html_mouseover > 0, c.html_mouseover, 0)
			) / (
				IF(b.url_protocol > 0, 1, 0) +
					IF(b.url_length > 0,1, 0) +
					IF(b.url_dot_total > 0, 1, 0) +
					IF(b.url_brandinfo > 0, 1, 0) +
					IF(b.url_link > 0, 1, 0) +
					IF(b.url_sensitive_char > 0, 1, 0) +
					IF(b.url_standard_port > 0, 1, 0) +
					IF(b.url_subdomain > 0, 1, 0) +
					IF(b.url_symbol > 0, 1, 0) +
					IF(b.html_alert > 0, 1, 0)  +
					IF(b.html_empty_link > 0,1, 0) +
					IF(b.html_iframe > 0, 1, 0) +
					IF(b.html_is_consist > 0, 1, 0) +
					IF(b.html_js_list > 0, 1, 0) +
					IF(b.html_length > 0, 1, 0) +
					IF(b.html_link_external_list > 0, 1, 0) +
					IF(b.html_login > 0, 1, 0) + 
					IF(b.html_mouseover > 0, 1, 0)
			) >= 0.3 AND
			(
					IF(b.url_protocol > 0, c.url_protocol, 0) +
					IF(b.url_length > 0, c.url_length, 0) +
					IF(b.url_dot_total > 0, c.url_dot_total, 0) +
					IF(b.url_brandinfo > 0, c.url_brandinfo, 0) +
					IF(b.url_link > 0, c.url_link, 0) +
					IF(b.url_sensitive_char > 0, c.url_sensitive_char, 0) +
					IF(b.url_standard_port > 0, c.url_standard_port, 0) +
					IF(b.url_subdomain > 0, c.url_subdomain, 0) +
					IF(b.url_symbol > 0, c.url_symbol, 0) +
					IF(b.html_alert > 0, c.html_alert, 0)  +
					IF(b.html_empty_link > 0, c.html_empty_link, 0) +
					IF(b.html_iframe > 0, c.html_iframe, 0) +
					IF(b.html_is_consist > 0, c.html_is_consist, 0) +
					IF(b.html_js_list > 0, c.html_js_list, 0) +
					IF(b.html_length > 0, c.html_length, 0) +
					IF(b.html_link_external_list > 0, c.html_link_external_list, 0) +
					IF(b.html_login > 0, c.html_login, 0) + 
					IF(b.html_mouseover > 0, c.html_mouseover, 0)
			) / (
				IF(b.url_protocol > 0, 1, 0) +
					IF(b.url_length > 0,1, 0) +
					IF(b.url_dot_total > 0, 1, 0) +
					IF(b.url_brandinfo > 0, 1, 0) +
					IF(b.url_link > 0, 1, 0) +
					IF(b.url_sensitive_char > 0, 1, 0) +
					IF(b.url_standard_port > 0, 1, 0) +
					IF(b.url_subdomain > 0, 1, 0) +
					IF(b.url_symbol > 0, 1, 0) +
					IF(b.html_alert > 0, 1, 0)  +
					IF(b.html_empty_link > 0,1, 0) +
					IF(b.html_iframe > 0, 1, 0) +
					IF(b.html_is_consist > 0, 1, 0) +
					IF(b.html_js_list > 0, 1, 0) +
					IF(b.html_length > 0, 1, 0) +
					IF(b.html_link_external_list > 0, 1, 0) +
					IF(b.html_login > 0, 1, 0) + 
					IF(b.html_mouseover > 0, 1, 0)
			) <= 0.5
			, 'Phishing', 'Legitimate') as threshold2,
			IF((
					IF(b.url_protocol > 0, c.url_protocol, 0) +
					IF(b.url_length > 0, c.url_length, 0) +
					IF(b.url_dot_total > 0, c.url_dot_total, 0) +
					IF(b.url_brandinfo > 0, c.url_brandinfo, 0) +
					IF(b.url_link > 0, c.url_link, 0) +
					IF(b.url_sensitive_char > 0, c.url_sensitive_char, 0) +
					IF(b.url_standard_port > 0, c.url_standard_port, 0) +
					IF(b.url_subdomain > 0, c.url_subdomain, 0) +
					IF(b.url_symbol > 0, c.url_symbol, 0) +
					IF(b.html_alert > 0, c.html_alert, 0)  +
					IF(b.html_empty_link > 0, c.html_empty_link, 0) +
					IF(b.html_iframe > 0, c.html_iframe, 0) +
					IF(b.html_is_consist > 0, c.html_is_consist, 0) +
					IF(b.html_js_list > 0, c.html_js_list, 0) +
					IF(b.html_length > 0, c.html_length, 0) +
					IF(b.html_link_external_list > 0, c.html_link_external_list, 0) +
					IF(b.html_login > 0, c.html_login, 0) + 
					IF(b.html_mouseover > 0, c.html_mouseover, 0)
			) / (
				IF(b.url_protocol > 0, 1, 0) +
					IF(b.url_length > 0,1, 0) +
					IF(b.url_dot_total > 0, 1, 0) +
					IF(b.url_brandinfo > 0, 1, 0) +
					IF(b.url_link > 0, 1, 0) +
					IF(b.url_sensitive_char > 0, 1, 0) +
					IF(b.url_standard_port > 0, 1, 0) +
					IF(b.url_subdomain > 0, 1, 0) +
					IF(b.url_symbol > 0, 1, 0) +
					IF(b.html_alert > 0, 1, 0)  +
					IF(b.html_empty_link > 0,1, 0) +
					IF(b.html_iframe > 0, 1, 0) +
					IF(b.html_is_consist > 0, 1, 0) +
					IF(b.html_js_list > 0, 1, 0) +
					IF(b.html_length > 0, 1, 0) +
					IF(b.html_link_external_list > 0, 1, 0) +
					IF(b.html_login > 0, 1, 0) + 
					IF(b.html_mouseover > 0, 1, 0)
			) >= 0.5, 'Phishing', 'Legitimate') as threshold3
		from
		ph_scan_phishing_test a,
		ph_features_phishing_test b,
		ph_train c,
		ph_task d,
		ph_schedule s
		WHERE
		b.sc_phishing_test_id = a.sc_phishing_test_id AND
		d.task_id = c.task_id AND
		d.task_id = s.task_id AND
		c.task_id = s.task_id AND
		a.sch_id = s.sch_id AND
		s.sch_type = 'phishing' AND
		d.task_id = $get_taskid
		GROUP BY a.sc_phishing_test_id";


		$testing_result = $this->db->query($query_testing)->result();
	

		$q_proto = $this->count_feature_phising($get_schedule_id, 'a.url_protocol');
		$q_stdport = $this->count_feature_phising($get_schedule_id, 'a.url_standard_port');
		$q_urlsymbol = $this->count_feature_phising($get_schedule_id, 'a.url_symbol');
		$q_urlsubdomain = $this->count_feature_phising($get_schedule_id, 'a.url_subdomain');
		$q_url_len = $this->count_feature_phising($get_schedule_id, 'a.url_length');
		$q_url_dot_total = $this->count_feature_phising($get_schedule_id, 'a.url_dot_total');
		$q_url_sensitive_char = $this->count_feature_phising($get_schedule_id, 'a.url_sensitive_char');

		// HTML Features
		$q_html_alert = $this->count_feature_phising($get_schedule_id, 'a.html_alert');
		$q_html_login = $this->count_feature_phising($get_schedule_id, 'a.html_login');
		$q_html_empty_link = $this->count_feature_phising($get_schedule_id, 'a.html_empty_link');
		$q_html_length = $this->count_feature_phising($get_schedule_id, 'a.html_length');
		$q_html_is_consist = $this->count_feature_phising($get_schedule_id, 'a.html_is_consist');
		$q_html_jslist = $this->count_feature_phising($get_schedule_id, 'a.html_js_list');
		$q_html_str_embed = $this->count_feature_phising($get_schedule_id, 'a.html_string_embed');
		$q_html_str_extlist = $this->count_feature_phising($get_schedule_id, 'a.html_link_external_list');
		$q_html_redirect = $this->count_feature_phising($get_schedule_id, 'a.html_redirect');
		$q_html_iframe = $this->count_feature_phising($get_schedule_id, 'a.html_iframe');
		$q_html_mosueover = $this->count_feature_phising($get_schedule_id, 'a.html_mouseover');
		$q_html_popup = $this->count_feature_phising($get_schedule_id, 'a.html_popup');
		$q_html_favicon = $this->count_feature_phising($get_schedule_id, 'a.html_favicon');

		$send_toview['tasknew'] = $result_q;	
		$send_toview['taskid'] = $get_schedule_id;
		$send_toview['score_train'] = $score_features_train;
		$send_toview['score_testing'] = $testing_result;

		// url features
		$send_toview['count_urlprotocol'] = $q_proto;
		$send_toview['count_urlsymbol'] = $q_urlsymbol;
		$send_toview['count_urlsubdomain'] = $q_urlsubdomain;
		$send_toview['count_urlstdport'] = $q_stdport;
		$send_toview['count_url_len'] = $q_url_len;
		$send_toview['count_urldot_total'] = $q_url_dot_total;
		$send_toview['count_url_senschar'] = $q_url_sensitive_char;
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


		// $send_toview['feature_url'] = $feature_url;
		$send_toview['features'] = $features;
		$send_toview['title_bar'] = "Scan Result - Phising Detector";
		$send_toview['header_page'] = "Phising Detector";
		$send_toview['keyword'] = "Phising Detector";
		$send_toview['breadcrumb'] = "Dataset";
		$send_toview['description'] = "Home Phising Detector";
		$this->load->view('main/header', $send_toview);
		$this->load->view('main/navbar', $send_toview);
		$this->load->view('main/phisingresult', $send_toview);
		$this->load->view('main/footer', $send_toview);
	}
    

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
		Check kalo web ad alert
	 */

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


	public function count_feature_phising($sch_id, $feature){
		$query = "SELECT
		COUNT($feature) as count
		FROM
		ph_features_phishing_test a,
		ph_scan_phishing_test b,
		ph_schedule c
		WHERE
		a.sc_phishing_test_id = b.sc_phishing_test_id
		AND b.sch_id = c.sch_id 
		AND c.sch_id = $sch_id
		AND $feature = 1";
		return $this->db->query($query)->result();
	}	



}
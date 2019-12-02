<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

	function __construct(){
		parent::__construct();		
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->library('form_validation');
		$this->load->model('Mphscan');
		$this->load->model('Mphtask');
	}

	public function index(){
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
		$this->load->view('main/header', $data);
		$this->load->view('main/navbar', $data);
		$this->load->view('main/input', $data);
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
		if($result_q){
			$send_toview['tasknew'] = $result_q;
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
			if($check_ifclick){
				$files_process = scandir('/opt/lampp/htdocs/phising_detector/assets/phishing/'); // scan direktori
				$files = array_diff($files_process, array('.', '..')); // remove current dan prev direktori yang terhitung
				$i = 0;
				$concater;
				$data;
				$data2;
				$pack_data = [];
				$pack_data_task = [];
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
						$files2 = scandir('/opt/lampp/htdocs/phising_detector/assets/phishing/'.'P0'.$concater.$i);
						foreach($files2 as $file2){
							if($i <= 1000){
								$files3 = scandir('/opt/lampp/htdocs/phising_detector/assets/phishing/'.'P0'.$concater.$i.'/URL');
								foreach($files3 as $file3){
									// var_dump('P0'.$concater.$i.'&nbsp;'.$file3."<br/>\n");
									$files4 = fopen('/opt/lampp/htdocs/phising_detector/assets/phishing/'.'P0'.$concater.$i.'/URL/URL.txt', 'r');
									$data = fread($files4,filesize('/opt/lampp/htdocs/phising_detector/assets/phishing/'.'P0'.$concater.$i.'/URL/URL.txt'));
		
									$files5 = scandir('/opt/lampp/htdocs/phising_detector/assets/phishing/'.'P0'.$concater.$i.'/RAW-HTML');
									// $data2 = fread($files4_1,filesize('/opt/lampp/htdocs/phising_detector/assets/phishing/'.'P0'.$concater.$i.'/RAW-HTML/*'));
									foreach($files5 as $file5){
										$data2 = $file5;
										// $files6 = fopen('/opt/lampp/htdocs/phising_detector/assets/phishing/'.'P0'.$concater.$i.'/RAW-HTML'.'/'.$file5, 'r');
										// $data2 = fread($files6,filesize('/opt/lampp/htdocs/phising_detector/assets/phishing/'.'P0'.$concater.$i.'/RAW-HTML'.'/'.$file5));
										// $data2_read = file_get_contents('/opt/lampp/htdocs/phising_detector/assets/phishing/'.'P0'.$concater.$i.'/RAW-HTML'.'/'.$file5);
										// $fullpath_rawhtml = '/opt/lampp/htdocs/phising_detector/assets/phishing/'.'P0'.$concater.$i.'/RAW-HTML'.'/'.$file5;
										// $readhtml1 = $this->extract_html($fullpath_rawhtml);
									}
								}
							}
						}
						array_push($pack_data, (object)[
							"dataset_id" => 'P0'.$concater.$i,
							"dataset_url" => $data,
							"dataset_html_file"=> $data2,
							"task_id" => $result_task_id[0]['task_id']
						]);	
					}

					$sql = $this->Mphscan->save_batch($pack_data);
					if(!$sql){
						die("Error: Failed");
					}else{

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
						if($result_q){
							$send_toview['tasknew'] = $result_q;
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
	}

	public function read_html($uri){
		$process = file_get_contents($uri);
		echo $process;
	}

	public function extract_html($uri){
		$document = new DOMDocument();
		$document->loadHTMLFile($uri);
		// $tableElement = $document->getElementById("your-table-id");
		// $allTableRows = $tableElement->getElementsByTagName("tr");
		$link = $document->getElementsByTagName('a');
		foreach($allTableRows as $tableRow) {
			// and so on ..
			// do your processing of table rows and data here
			echo $tableRow;
		}
	}

	public function read_url($uri){
		$pack_data = [];
		array_push($pack_data, (object)[
			"dataset_id" => 'P0'.$concater.$i,
			"dataset_url" => $data,
		]);
	}


	
}

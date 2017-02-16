<?php
 	require_once("Rest.inc.php");
	class API extends REST {
		public $data = "";

		const DB_SERVER = "localhost:3306";
		const DB_USER = "root";
		const DB_PASSWORD = "123";
		const DB = "test";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}

		/*
		 *  Connect to Database
		*/
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
		}

		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}

		private function Items(){
      if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT distinct c.iditem, c.name, c.type, c.price FROM item c order by c.price desc";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}
		private function Item(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){
				$query="SELECT distinct c.iditem, c.name, c.type, c.price FROM item c where c.iditem=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}

		private function insertItem(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$item = json_decode(file_get_contents("php://input"),true);
			$column_names = array('name', 'type', 'price');
			$keys = array_keys($item);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the item received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $item[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO item(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($item)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Item Created Successfully.", "data" => $item);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}
		private function updateItem(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$item = json_decode(file_get_contents("php://input"),true);
			$id = (int)$item['id'];
			$column_names = array('name', 'type', 'price');
			$keys = array_keys($item['Item']);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the item received. If key does not exist, insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $item['Item'][$desired_key];
				}
				$columns = $columns.$desired_key."='".$$desired_key."',";
			}
			$query = "UPDATE item SET ".trim($columns,',')." WHERE iditem=$id";
			if(!empty($item)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Item ".$id." Updated Successfully.", "data" => $item);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}

		private function deleteItem(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){
				$query="DELETE FROM item WHERE iditem = $id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}

		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}

	// Initiiate Library

	$api = new API;
	$api->processApi();
?>

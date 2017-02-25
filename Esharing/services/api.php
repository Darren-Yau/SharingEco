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
		private function updateCar(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$item = json_decode(file_get_contents("php://input"),true);
			$id = (int)$item['id'];
			$column_names = array('Make', '', 'price');
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
		
		private function getRecMail(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id']; //ID needs to equal current user ID
			if($id > 0){
				$query="SELECT c.sendID c.TimeSent c.Message FROM item c where c.RecID=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}
		private function getSentMailMail(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id']; //ID needs to equal current user ID
			if($id > 0){
				$query="SELECT c.sendID c.TimeSent c.Message FROM item c where c.SendID=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}
		
		private function getRecMail(){

			$id = (int)$this->_request['id']; //ID needs to equal current user ID
			if($id > 0){
				$query="SELECT c.sendID c.TimeSent c.Message FROM item c where c.RecID=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}
		
		private function getSentMail(){

			$id = (int)$this->_request['id']; //ID needs to equal current user ID
			if($id > 0){
				$query="SELECT c.sendID c.TimeSent c.Message FROM item c where c.SendID=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}
		
		private function generateSalt(){
			return substr(md5(microtime()),rand(0,26),8);
		}
		private function generateHash($pass, $salt){
			return md5($salt. $pass);
		}
		
		private function getCar($id){
			
				$query="SELECT * FROM post, car WHERE post.ID=car.ID AND post.ID={$id}";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			
			$this->response('',204);	// If no records "No Content" status
		}
		private function getHouse($id){

				$query="SELECT * FROM post, house WHERE post.ID=house.ID AND post.ID={$id}";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			
			$this->response('',204);	// If no records "No Content" status
		}
		}
		private function getCars(){

				$query="SELECT * FROM post, car WHERE post.ItemType=\"car\" AND post.ID=car.ID";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			
			$this->response('',204);	// If no records "No Content" status
		}
		private function getHouses(){
				$query="SELECT * FROM post as c WHERE c.ItemType=\"house\"";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			
			$this->response('',204);	// If no records "No Content" status
			
		}
		private function createUser($Fname, $Lname, $Email, $Password){
				$salt = generateSalt();
				$hashedPass = md5($salt. $Password);
				$query = "INSERT INTO user ('PassHash', 'PassSalt', 'Fname', 'Lname', 'Email') VALUES ('$hashedPass','$salt','$Fname','$Lname','$Email')"
				if($this->mysqli->query($query) == TRUE) return true;
				return false;
			
		}
		private function userLoginVerifiation($username, $pass){
			$query="SELECT PassSalt, PassHash FROM user as c WHERE c.Email = {$username}";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$row = $r->fetch_assoc();
					$hash = md5($row["PassSalt"]. $pass);
					if($hash == $row["PassHash"]) return true;
				}
			return false;
		}
		private function checkUniqueEmail($username){
			$query="SELECT * FROM user as c WHERE c.Email = {$username}";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) return false;
				return true;
		}
		
		
		
		
		
		private function sendMail($sendID, $recID, $message){
			$query="INSERT INTO mail (SendID, RecID, TimeSent, Message) VALUES ($sendID,$recID,'$message')";
			if($this->mysqli->query($query) == TRUE) return true;
				return false;
		}
		
		private function deletePost($id){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){
				$query ="SELECT ItemType FROM post WHERE post.id = $id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$row = $r->fetch_assoc();
				$type = $row['ItemType'];
				
				$query="DELETE FROM '$type' WHERE ID = $id";
				$r1 = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$query="DELETE FROM post WHERE iditem = $id";
				$r2 = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200)
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
		--getRecMail
		--getSentMail
		--generateHash
		--generateSalt
		--sendMail
		insertHouse
		insertCar
		updateCar
		updateHouse
		--deletePost
			--delete car/house type table entry
		--getCar
		--getHouse
		--getCars
		--getHouses
		--createUser
		--userLoginVerifiation
		--checkUniqueEmail
		
		
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
		 *
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

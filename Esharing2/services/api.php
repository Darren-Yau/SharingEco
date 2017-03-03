<?php
 	require_once("Rest.inc.php");
	class API extends REST {
		public $data = "";

		const DB_SERVER = "localhost:3306";
		const DB_USER = "root";
		const DB_PASSWORD = "1234";
		const DB = "Eshare";

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

    private function Cars(){
      if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT * FROM post, car WHERE post.ItemType='car' AND post.ID=car.ID";
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

    private function Car(){
      if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){
				$query="SELECT * FROM post, car, user WHERE post.ID=$id AND post.CarID=car.ID AND post.CreatorID=user.ID";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
    }

    private function getPosts(){
      if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			$query="SELECT * FROM post, car, house WHERE post.CreatorID=$id AND post.CarID=car.ID AND post.HouseID=house.ID";
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);
    }

    private function verifyemail(){
      if($this->get_request_method()!="GET"){
        $this->response('',406);
      }
      $email=$this->_request['email'];
      $query="SELECT c.Email FROM user c where c.Email='$email'";
      $r=$this->mysqli->query($query) or die($this->mysqli->error._LINE_);
      if($r->num_rows>0){
        $result=$r->fetch_assoc();
        $this->response($this->json($result),200);
      }
      $this->response('',204);
    }

    private function insertUser(){
      if($this->get_request_method() != "POST"){
      $this->response('',406);
      }

      $User = json_decode(file_get_contents("php://input"),true);
      $User['PassSalt']=substr(md5(microtime()),rand(0,26),8);
      $User['PassHash']=md5($User['PassHash'].$User['PassSalt']);
      $column_names = array('PassHash', 'PassSalt', 'Fname', 'Lname', 'Email');
      $keys = array_keys($User);
      $columns = '';
      $values = '';
      foreach($column_names as $desired_key){ // Check the user received. If blank insert blank into the array.
         if(!in_array($desired_key, $keys)) {
         $$desired_key = '';
      }else{
      $$desired_key = $User[$desired_key];
      }
      $columns = $columns.$desired_key.',';
      $values = $values."'".$$desired_key."',";
      }
      $query = "INSERT INTO user(".trim($columns,',').") VALUES(".trim($values,',').")";
      if(!empty($User)){
      $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
      $success = array('status' => "Success", "msg" => "User Created Successfully.", "data" => $User);
      $this->response($this->json($success),200);
      }else
      $this->response('',204); //"No Content" status
    }

    private function loginverify(){
      if($this->get_request_method()!="GET"){
        $this->response('',406);
      }
      $email=$this->_request['email'];
      $pass=$this->_request['password'];
      $query="SELECT * FROM user c where c.Email='$email'";
      $r=$this->mysqli->query($query) or die($this->mysqli->error._LINE_);
      if($r->num_rows>0){
        $row=$r->fetch_assoc();
        $hash = md5($pass.$row["PassSalt"]);
				if($hash == $row["PassHash"]){
          $this->response(1,200);
        }else
        $this->response(0,200);
      }else
      $this->response('',204);
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

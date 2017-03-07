<?php
 	require_once("Rest.inc.php");
  class API extends REST {
		public $data = "";

		const DB_SERVER = "localhost:3306";
		const DB_USER = "root";
		const DB_PASSWORD = "root";
		const DB = "eshare";

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

    private function Posts_Cars_byType(){
      if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT * FROM post, car WHERE post.ItemType='car' AND post.CarID=car.CarID";
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

    private function Post(){
      if($this->get_request_method() != "GET"){
        $this->response('',406);
      }
      $id = (int)$this->_request['id'];
      if($id > 0){
        $query="SELECT * FROM post WHERE post.ID=$id";
        $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
        if($r->num_rows > 0) {
          $result = $r->fetch_assoc();
          $this->response($this->json($result), 200); // send user details
        }
      }
      $this->response('',204);	// If no records "No Content" status
    }

    private function Car(){
      if($this->get_request_method() != "GET"){
        $this->response('',406);
      }
      $id = (int)$this->_request['id'];
      if($id > 0){
        $query="SELECT * FROM car WHERE car.CarID=$id";
        $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
        if($r->num_rows > 0) {
          $result = $r->fetch_assoc();
          $this->response($this->json($result), 200); // send user details
        }
      }
      $this->response('',204);	// If no records "No Content" status
    }
    private function updateCar(){
       if($this->get_request_method() != "POST"){
       $this->response('',406);
       }
       $Car = json_decode(file_get_contents("php://input"),true);
       $id = (int)$Car['id'];
       $column_names = array('Make', 'Model', 'Yr', 'Color', 'Price');
       $keys = array_keys($Car['Car']);
       $columns = '';
       $values = '';
       foreach($column_names as $desired_key){ // Check the customer received. If key does not exist, insert blank into the array.
          if(!in_array($desired_key, $keys)) {
          $$desired_key = '';
       }else{
       $$desired_key = $Car['Car'][$desired_key];
       }
       $columns = $columns.$desired_key."='".$$desired_key."',";
       }
       $query = "UPDATE car SET ".trim($columns,',')." WHERE CarID=$id";
       if(!empty($Car)){
       $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
       $success = array('status' => "Success", "msg" => "Car".$id." Updated Successfully.", "data" => $Car);
       $this->response($this->json($success),200);
       }else
       $this->response('',204); // "No Content" status
     }

     private function insertCar(){
       if($this->get_request_method() != "POST"){
       $this->response('',406);
       }

       $Car = json_decode(file_get_contents("php://input"),true);
       $column_names = array('Make', 'Model', 'Yr', 'Color', 'Price');
       $keys = array_keys($Car);
       $columns = '';
       $values = '';
       foreach($column_names as $desired_key){ // Check the user received. If blank insert blank into the array.
          if(!in_array($desired_key, $keys)) {
          $$desired_key = '';
       }else{
       $$desired_key = $Car[$desired_key];
       }
       $columns = $columns.$desired_key.',';
       $values = $values."'".$$desired_key."',";
       }
       $query = "INSERT INTO car(".trim($columns,',').") VALUES(".trim($values,',').")";
       if(!empty($Car)){
       $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
       $success = array('status' => "Success", "msg" => "Car Created Successfully.", "data" => $Car,"id"=>$this->mysqli->insert_id);
       $this->response($this->json($success),200);
       }else
       $this->response('',204); //"No Content" status
     }
     private function insertCar_Post(){
       if($this->get_request_method() != "POST"){
       $this->response('',406);
       }
     
       $column_names = array('Make', 'Model', 'Yr', 'Color', 'Price');
       $keys = array_keys($Item['Car']);
       $columns = '';
       $values = '';
       foreach($column_names as $desired_key){ // Check the user received. If blank insert blank into the array.
          if(!in_array($desired_key, $keys)) {
          $$desired_key = '';
       }else{
       $$desired_key = $Item['Car'][$desired_key];
       }
       $columns = $columns.$desired_key.',';
       $values = $values."'".$$desired_key."',";
       }
       $query = "INSERT INTO car(".trim($columns,',').") VALUES(".trim($values,',').")";
       if(!empty($Item['Car'])){
       $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
       $Item['Post']['CarID']=$this->mysqli->insert_id;
       }
       $column_names = array('DateCreated', 'CreatorID', 'Title', 'ItemType', 'Description', 'AvailStart', 'AvailEnd', 'Address', 'CarID', 'HouseID', 'imgsrc');
       $keys = array_keys($Item['Post']);
       $columns = '';
       $values = '';
       foreach($column_names as $desired_key){ // Check the user received. If blank insert blank into the array.
          if(!in_array($desired_key, $keys)) {
          $$desired_key = '';
       }else{
       $$desired_key = $Item['Post'][$desired_key];
       }
       $columns = $columns.$desired_key.',';
       $values = $values."'".$$desired_key."',";
       }
       $query = "INSERT INTO post(".trim($columns,',').") VALUES(".trim($values,',').")";
       if(!empty($Item['Post'])){
       $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
       $success = array('status' => "Success", "msg" => "Post Created Successfully.", "data" => $Item);
       $this->response($this->json($success),200);
       }else
       $this->response('',204); //"No Content" status
     }

     private function updatePost(){
        if($this->get_request_method() != "POST"){
        $this->response('',406);
        }
        $Post = json_decode(file_get_contents("php://input"),true);
        $id = (int)$Post['id'];
        $column_names = array('Title', 'Address', 'AvailStart', 'AvailEnd', 'Description', 'imgsrc');
        $keys = array_keys($Post['Post']);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the customer received. If key does not exist, insert blank into the array.
         if(!in_array($desired_key, $keys)) {
         $$desired_key = '';
        }else{
        $$desired_key = $Post['Post'][$desired_key];
        }
        $columns = $columns.$desired_key."='".$$desired_key."',";
        }
        $query = "UPDATE post SET ".trim($columns,',')." WHERE ID=$id";
        if(!empty($Post)){
        $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
        $success = array('status' => "Success", "msg" => "Post".$id." Updated Successfully.", "data" => $Post);
        $this->response($this->json($success),200);
        }else
        $this->response('',204); // "No Content" status
    }

    private function Post_Car_User(){
        if($this->get_request_method() != "GET"){
  				$this->response('',406);
  			}
  			$id = (int)$this->_request['id'];
  			if($id > 0){
  				$query="SELECT post.*, car.*, user.ID, user.Fname, user.Email FROM post, car, user WHERE post.ID=$id AND post.CarID=car.CarID AND post.CreatorID=user.ID";
  				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
  				if($r->num_rows > 0) {
  					$result = $r->fetch_assoc();
  					$this->response($this->json($result), 200); // send user details
  				}
  			}
  			$this->response('',204);	// If no records "No Content" status
    }

    private function Posts_cars(){
      if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			$query="SELECT * FROM post,car where post.CreatorID=$id AND post.CarID=car.CarID";
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

    private function Posts_houses(){
      if($this->get_request_method() != "GET"){
        $this->response('',406);
      }
      $id = (int)$this->_request['id'];
      $query="SELECT * FROM post,house where post.CreatorID=$id AND post.HouseID=house.HouseID";
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
          $_SESSION["email"] = $email;
          $_SESSION["password"] = $pass;
          $this->response(1,200);
        }else
        $this->response(0,200);
      }else
      $this->response('',204);
    }
    private function deleteCar(){
     if($this->get_request_method() != "DELETE"){
     $this->response('',406);
     }
     $id = (int)$this->_request['id'];
     $CarID=(int)$this->_request['CarID'];
     if($id > 0){
     $query="DELETE FROM car WHERE CarID = $CarID";
     $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
     $query="DELETE FROM post WHERE ID = $id";
     $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
     $success = array('status' => "Success", "msg" => "Successfully deleted one record.");
     $this->response($this->json($success),200);
     }else
     $this->response('',204); // If no records "No Content" status
    }

		private function Mails(){
		$id = (int)$this->_request['id']; //ID needs to equal current user ID
		if($id > 0){
			$query="SELECT * FROM mail where SendID=$id or RecID=$id";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0) {
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[]=$row;
				}
				$this->response($this->json($result), 200); // return sent mail details
			}
		}
		$this->response('',204);	// If no records "No Content" status
	}

  private function SendMail(){
      $Mail = json_decode(file_get_contents("php://input"),true);

      //senderName
      $query = "SELECT Fname FROM User WHERE ID= $Mail.sendID";
      $result = $this->mysqli($query);
      $row = $result->fetch_assoc();

      $senderName = $row.Fname;


      $query = "SELECT Fname FROM User WHERE ID= $Mail.recID";
      $result = $this->mysqli($query);
      $row = $result->fetch_assoc();

      $recName = $row.Fname;



      $now = time();
      $query = "INSERT INTO MAIL(SendID, RecID, TimeSent,Message, Sender, Receiver) VALUES($Mail.sendID, $Mail.recID, $now, $senderName, $recName) ";
      $result = $this->mysqli($query);
      $this->response($this->json($result), 200);
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

<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  
//   header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");


  include_once '../Config/Database.php';
  include_once '../Model/Book.php';
  include_once '../Model/Dvd.php';
  include_once '../Model/Furniture.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();
  
  
    
    // Instantiate 3 objects 
    $book = new Book($db);
    $dvd = new Dvd($db);
    $furniture = new Furniture($db);

    $method = $_SERVER['REQUEST_METHOD'];


    switch($method) {
        case 'GET':
            // Read queries
            $resultBook = $book->getProducts();
            $resultDvd = $dvd->getProducts();
            $resultFurn = $furniture->getProducts();
            
            // Get row counts
            $numBook = $resultBook->rowCount();
            $numDvd = $resultDvd->rowCount();
            $numFurn = $resultFurn->rowCount();

            // Product array
            $product_arr = array();        

            // Check if any Products from "books" table
            if($numBook > 0) {  

                while($row = $resultBook->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
            
                $book_item = array(
                    'sku' => $sku,
                    'name' => $name,
                    'price' => $price,
                    'type' => $type,
                    'weight' => $weight,
                );
            
                // Push to "data"
                array_push($product_arr, $book_item);
                }            
            } 
            
            // Check if any Products from "dvds" table
            if($numDvd > 0) {  
                while($row = $resultDvd->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
            
                $dvd_item = array(
                    'sku' => $sku,
                    'name' => $name,
                    'price' => $price,
                    'type' => $type,
                    'size' => $size,
                );
            
                // Push to "data"
                array_push($product_arr, $dvd_item);
                } 
            }

             // Check if any Products from "dvds" table
             if($numFurn > 0) {  
                while($row = $resultFurn->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
            
                $furn_item = array(
                    'sku' => $sku,
                    'name' => $name,
                    'price' => $price,
                    'type' => $type,
                    'dimension' => $dimension,
                );
            
                // Push to "data"
                array_push($product_arr, $furn_item);
                } 
            }

            if($numDvd <= 0 && $numBook <= 0 && $numFurn <= 0) {
                // No Product
                echo json_encode(
                array('message' => 'No Proudcts Found')
                );
                exit();
            }

            // Turn to JSON & output
            echo json_encode($product_arr);
            break;
        case 'POST':

            $product = json_decode(file_get_contents('php://input'));

            switch ($product->type) {  //The factory design pattern 
                case 'book':
                   return $book->createProduct($product);                
                case 'dvd':
                    return $dvd->createProduct($product); 
                case 'furniture':
                    return  $furniture->createProduct($product); ;
                default:
                    throw new Exception("Invalid product type");
            }
            // $result = createProduct($object, $type, $product);

            if($result) {
                // $data = ['status' => 1, 'message' => "Record successfully created"];
                $data = "Record successfully created";
            } else {
                // $data = ['status' => 0, 'message' => "Failed to create record."];
                $data = "Failed to create record.";
            }
            echo json_encode($data);
            break;

            case 'DELETE':
                // $product = new Product($db);
                $skus = json_decode(file_get_contents('php://input'));

                $skus_arr = $skus->skus;
                $count = 0;
                // $flag = 0;
                if (sizeof($skus_arr) == 0){ // array is empty  
                    echo "array is empty";
                    exit();
                }


                foreach ($skus_arr as $sku) {

                    $count++;
                    // echo $count;
                    $flag = $book->deleteProduct($sku); // rather than book object, dvd or furniture object also works because 
                                               // deleteProduct is abstract class function
                }

            
                
                echo json_encode("$count product(s) successfully deleted");
                break;
    }



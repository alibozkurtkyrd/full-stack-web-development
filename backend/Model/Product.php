<?php
abstract class Product {
    protected $sku;
    protected $name;
    protected $price;
    protected $type;


    // Db table
    protected $table = "products";
    // Db connection
    protected $conn;
    
    // Constructor with DB
    public function __construct($db) {
        // echo "baglantı saglandı";
        $this->conn = $db;
      }


    // Getters and setters for the common attributes

      public function getSku() { return $this->sku; }
      public function setSku($sku) { $this->sku = $sku; }
      public function getName() { return $this->name; }
      public function setName($name) { $this->name = $name; }
      public function getPrice() { return $this->price; }
      public function setPrice($price) { $this->price = $price; }
      public function getType() { return $this->type; }
      public function setType($type) { $this->type = $type; }

    public function deleteProduct($sku){

      // there is a delete cascade restriction thus there is no need delete operation on dvds,books 
      // or furnirute tables after deletion on products table.

      // Create query
      $query = 'DELETE FROM ' . $this->table . ' WHERE sku = :sku';

      // Prepare statement 
      $stmt = $this->conn->prepare($query);

      // Clean data 
      $this->setSku(htmlspecialchars(strip_tags($sku)));

      // Bind data for "products" table
      $stmt->bindParam(':sku', $this->getSku());

      $stmt->execute();
      $row = $stmt->fetch();
      // Execute query
      if($row) {
        return true;

      }

      else 
        return false;      
    }

    // abstract functions
    abstract public function getProducts();
    abstract public function createProduct($product);
    
}

?>
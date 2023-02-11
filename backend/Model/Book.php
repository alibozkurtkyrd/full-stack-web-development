<?php

include_once '../Model/Product.php';
class Book extends Product {
    private $weight;
    private $relatedTable = "books";


    // public function getSku() { return $this->getSku(); }
    // public function setSku($sku) { return $this->setSku($sku);}

    // get and set methods for weight property
    public function getWeight() { return $this->weight; }
    public function setWeight($weight) { $this->weight = $weight; }

    public function getProducts(){
        $sqlQuery = "SELECT p.*, b.weight FROM 
            " . $this->table . " p JOIN ". $this->relatedTable. " b ON p.sku = b.sku";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }
    public function createProduct($product){

        // this query for insert operation on products table
        $sqlQuery = "INSERT INTO
                ". $this->table ."
            SET
                sku = :sku, 
                name = :name, 
                price = :price,
                type = :type";

        $stmt = $this->conn->prepare($sqlQuery);

        // sanitize
        $this->setSku(htmlspecialchars(strip_tags($product->sku)));
        $this->setName(htmlspecialchars(strip_tags($product->name)));
        $this->setPrice(htmlspecialchars(strip_tags($product->price)));
        $this->setType(htmlspecialchars(strip_tags($product->type)));

        // bind data
        $stmt->bindParam(":sku", $this->getSku());
        $stmt->bindParam(":name", $this->getName());
        $stmt->bindParam(":price", $this->getPrice());
        $stmt->bindParam(":type", $this->getType());

        // this query for insert operation on "books" table
        $sqlQuery1 = "INSERT INTO
                ". $this->relatedTable ."
            SET
                sku = :sku, 
                weight = :weight";

        $stmt1 = $this->conn->prepare($sqlQuery1);
        
        $this->setWeight(htmlspecialchars(strip_tags($product->weight)));

        $stmt1->bindParam(":sku", $this->getSku());
        $stmt1->bindParam(":weight", $this->getWeight());

        if($stmt->execute() && $stmt1->execute()){
            return true;
        }
        
        return false;
    }
    
}


?>
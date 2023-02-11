<?php

include_once '../Model/Product.php';
class Furniture extends Product {
    private $dimension;
    private $relatedTable = "furniture";


    public function getDimension() { return $this->dimension; }
    public function setDimension($dimension) { $this->dimension = $dimension; }

    public function getProducts(){
        $sqlQuery = "SELECT p.*, f.dimension FROM 
            " . $this->table . " p JOIN ". $this->relatedTable. " f ON p.sku = f.sku";
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
                dimension = :dimension";

        $stmt1 = $this->conn->prepare($sqlQuery1);
        
        $this->setDimension(htmlspecialchars(strip_tags($product->dimension)));

        $stmt1->bindParam(":sku", $this->getSku());
        $stmt1->bindParam(":dimension", $this->getDimension());

        if($stmt->execute() && $stmt1->execute()){
            return true;
        }
        
        return false;
    }

}
?>

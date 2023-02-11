<?php
include_once '../Model/Product.php';
class Dvd extends Product {
    private $size;
    private $relatedTable = "dvds";

    // get and set methods for size property
    public function getSize() { return $this->size; }
    public function setSize($size) { $this->size = $size; }

    public function getProducts(){
        $sqlQuery = "SELECT p.*, d.size FROM 
            " . $this->table . " p JOIN ". $this->relatedTable. " d ON p.sku = d.sku";
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
        
        // this query for insert operation on "dvds" table
        $sqlQuery1 = "INSERT INTO
                ". $this->relatedTable ."
            SET
                sku = :sku, 
                size = :size";

        $stmt1 = $this->conn->prepare($sqlQuery1);
        
        $this->setSize(htmlspecialchars(strip_tags($product->size)));

        $stmt1->bindParam(":sku", $this->getSku());
        $stmt1->bindParam(":size", $this->getSize());

        if($stmt->execute() && $stmt1->execute()){
            return true;
        }
        
        return false;
    }

}
?>
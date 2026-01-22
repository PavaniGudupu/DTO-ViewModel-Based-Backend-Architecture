#  DTO + ViewModel Based Backend Architecture

A backend **Inventory Management API** built using **Node.js, Express, PostgreSQL, and pg-promise**, following **Clean Architecture principles** with both **DTO (Data Transfer Object)** and **ViewModel** layers.

This project focuses on:
- Secure data flow into the backend (DTO)
- Stable and UI-safe data flow out of the backend (ViewModel)
- Scalable, maintainable backend structure suitable for real-world applications

---

## 🚀 Features

- 📦 Product CRUD operations  
- 🗂️ Category listing  
- 🔍 Filter & search products  
- 🛡️ DTO-based request handling (Input control)  
- 🖥️ ViewModel-based response mapping (Output control)  
- ✅ Centralized validation middleware  
- 🔄 Clean API response format (success / failure)  
- 🌐 CORS enabled for frontend integration  

---

## 🧠 Architecture Overview

### 🔐 DTO (Input Layer)
Controls **what data is allowed to enter** the backend.

### 🖥️ ViewModel (Output Layer)
Controls **what data is sent to the frontend**, independent of database column names.

    
    Request → DTO → Model → ViewModel → Response


This separation ensures:
- Database changes do NOT break frontend
- API responses remain stable
- Clear responsibility per layer

---

## 🧠 Why DTO?

DTO (Data Transfer Object) is used to:

- Control what data enters the backend  
- Prevent unwanted or malicious fields  
- Separate request shape from database logic  
- Improve maintainability and security  

Instead of passing `req.body` directly to database queries, incoming data is mapped to a **ProductDTO**.

---

## 🧠 Why ViewModel?

ViewModel is used to:

- Control response structure sent to UI  
- Rename database fields safely  
- Prevent leaking internal DB column names  
- Keep frontend independent from backend schema changes  

Example:
- DB column: `product_name`
- API response: `productName`

---

## 🏗️ Tech Stack

| Layer | Technology |
|-----|------------|
| Backend | Node.js, Express |
| Database | PostgreSQL |
| DB Library | pg-promise |
| Validation | Custom Middleware |
| Architecture | MVC + DTO + ViewModel |
| API Format | REST |

---

## 📁 Project Structure

```text
backend/
│── dto/
│   └── product.dto.js
│── viewModelMapper/
│   └── product.viewModel.js
│── utils/
│   ├── dtoMapper.js
│   ├── productViewModelMapper.js
│   └── apiResponse.js
│── middleware/
│   └── validation.js
│── models/
│   ├── productModel.js
│   └── categoryModel.js
│── db.js
│── server.js
│── .env
```

🧾 Product DTO (Input Control)
 ```     export const ProductDTO = {
        name: null,
        category_id: null,
        mrp: null,
        sp: null,
        cp: null,
        classification: null,
        size: null
      };
```

🔄 DTO Mapping
   ``` const productData = mapToDTO(req.body, ProductDTO);   ```

---


🖥️ Product ViewModel (Output Control)

<img width="998" height="401" alt="Screenshot 2026-01-22 222041" src="https://github.com/user-attachments/assets/32c0369d-d12c-4766-8312-32688fdfe253" />

---

🔄 ViewModel Mapper
<img width="1001" height="449" alt="Screenshot 2026-01-22 222130" src="https://github.com/user-attachments/assets/628bda66-f883-4221-b8e7-cbb2c93570d0" />
---


📡 API Example (Using ViewModel)
<img width="969" height="250" alt="Screenshot 2026-01-22 222202" src="https://github.com/user-attachments/assets/45f4a87a-916d-45ab-8b3f-2f2a09c48a3a" />

---
# 📡 API Endpoints

| Endpoint Description              | Method | Path                  |
|-----------------------------------|--------|-----------------------|
| ➕ Add Product                    | POST   | `/AddProduct`         |
| 📋 Product List (Filter & Search) | POST   | `/ProductList`        |
| ✏️ Update Product                 | POST   | `/UpdateProduct/:id`  |
| 🗑️ Delete Product                 | POST   | `/DeleteProduct/:id`  |
| 📂 Get Categories                 | POST   | `/getCategories`      |


🌱 Learning Outcome

- First real-world use of DTO for request control
- Implemented ViewModel for response stability 
- Learned separation of input vs output contracts
- Improved backend scalability & maintainability
- PostgreSQL integration using pg-promise

---

👩‍💻 Author

Pavani Gudupu
Backend Developer | Learning Clean Architecture

⭐ If you found this useful, give it a star!


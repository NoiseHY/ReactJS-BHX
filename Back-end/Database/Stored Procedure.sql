use API_BachHoaXanh_ReactJS
go

--- bảng sản phẩm ---

-- lấy 10 sản phẩm mới nhất 
CREATE PROCEDURE GetNewProducts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 10
        id, nameProd, desProd, num, up , img, rating
    FROM 
        products
    ORDER BY 
        dateBegin DESC;
END;


exec GetNewProducts 

-- lấy sản phẩm được xem nhiều nhất 
CREATE PROCEDURE GetBestViewProducts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 10
        id, nameProd, desProd, num, up, img, rating, viewProd
    FROM 
        products
    ORDER BY 
        viewProd DESC, rating DESC;
END;

exec  GetBestViewProducts

--Lấy chi tiết sản phẩm theo id
CREATE PROCEDURE GetProductByID
    @ProductId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        P.id AS idProd,
        P.nameProd AS nameProd,
        P.desProd AS desProd,
        P.num AS num,
        P.up AS up,
		P.rating AS rating,
        P.idCat AS idCat,
		P.idUnits AS idUnits,
        P.img AS img,
        D.ing AS ing,
        D.note AS note,
        D.stor AS stor,
        D.pop AS pop,
        U.nameUn AS nameUn,
        S.nameSup AS nameSup,
        C.nameCat AS nameCat
    FROM 
        products P
    LEFT JOIN 
        detailProd D ON P.id = D.idProd
    LEFT JOIN 
        units U ON D.idUnit = U.id
    LEFT JOIN 
        sups S ON D.idSup = S.id
    LEFT JOIN 
        categories C ON P.idCat = C.id
    WHERE 
        P.id = @ProductId;
END;

exec GetProductByID 1	

--drop procedure GetProductByID


--- bảng tài khoản ---

---> user



--> admin

--get all 

CREATE PROCEDURE GetAllAccounts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        id, nameAcc, pasAcc, email, idAuth, idCuts, dateBegin, dateEnd
    FROM 
        acc;
END;

exec GetAllAccounts

--create account
CREATE PROCEDURE CreateAccount
    @Name NVARCHAR(50),
    @Password NVARCHAR(50),
    @Email NVARCHAR(50),
    @AuthorizationID INT,
    @CustomerID INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO acc (nameAcc, pasAcc, email, idAuth, idCuts, dateBegin)
    VALUES (@Name, @Password, @Email, @AuthorizationID, @CustomerID, GETDATE());
END;

--edit account
CREATE PROCEDURE UpdateAccount
    @AccountID INT,
    @Name NVARCHAR(50) = NULL,
    @Password NVARCHAR(50) = NULL,
    @Email NVARCHAR(50) = NULL,
    @AuthorizationID INT = NULL,
    @CustomerID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE acc
    SET
        nameAcc = ISNULL(@Name, nameAcc),
        pasAcc = ISNULL(@Password, pasAcc),
        email = ISNULL(@Email, email),
        idAuth = ISNULL(@AuthorizationID, idAuth),
        idCuts = ISNULL(@CustomerID, idCuts),
		dateEnd = GETDATE()
    WHERE
        id = @AccountID;
END;

EXEC UpdateAccount @AccountID = 10, @Email = 'newemail123@example.com', @AuthorizationID = 2;

select * from acc

--delete acc

CREATE PROCEDURE DeleteAccount
    @AccountID INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM acc
    WHERE id = @AccountID;
END;


EXEC DeleteAccount @AccountID = 4;

select * from acc



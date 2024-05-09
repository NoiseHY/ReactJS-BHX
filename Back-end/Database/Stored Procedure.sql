use API_BachHoaXanh_ReactJS
go

--- bảng sản phẩm ---

-- lấy 10 sản phẩm mới nhất -- 
CREATE PROCEDURE GetNewestProducts
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;
    
    SELECT 
        id, nameProd, desCat, num, up, idCat, img
    FROM (
        SELECT 
            ROW_NUMBER() OVER (ORDER BY dateBegin DESC) AS RowNum,
            id, nameProd, desCat, num, up, idCat, img
        FROM 
            products
    ) AS RowConstrainedResult
    WHERE 
        RowNum > @Offset
        AND RowNum <= (@Offset + @PageSize)
    ORDER BY 
        RowNum;
END;


exec GetNewestProducts 1, 10

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



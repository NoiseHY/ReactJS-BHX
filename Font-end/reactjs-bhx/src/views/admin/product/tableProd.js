import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal_editProd from './modal_editProd';
import { fetchAllProd, delProd, getCatByID, getUnitByID } from '../../../services/admin/productsServices';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

const TableProd = () => {
  const [list, setList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [DataToEdit, setDataToEdit] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const ProdPerPage = 10;

  useEffect(() => {
    getProd();
  }, []);

  const getProd = async () => {
    try {
      const res = await fetchAllProd();
      if (res) {
        const updatedProds = await Promise.all(res.map(async (prod) => {
          const cat = await getCatByID(prod.idCat);
          const unit = await getUnitByID(prod.idUnits);

          // console.log(`Product ID: ${prod.id}, Category: ${cat[0].nameCat}, Unit: ${unit[0].nameUn}`);

          return {
            ...prod,
            catName: cat[0].nameCat,
            unitName: unit[0].nameUn
          };
        }));
        setList(updatedProds);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEditProd = (id) => {
    const Edit = list.find(prod => prod.id === id);
    if (Edit) {
      setDataToEdit(Edit);
      setShowEditModal(true);
    }
  };

  const handleDeleteProd = async (id) => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (confirmation) {
      try {
        await delProd(id);
        toast.success("Sản phẩm đã được xóa thành công!");
        getProd();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error("Đã xảy ra lỗi khi xóa: " + error.message);
      }
    }
  };

  const pageCount = Math.ceil(list.length / ProdPerPage);

  const displayProds = list
    .slice(pageNumber * ProdPerPage, (pageNumber + 1) * ProdPerPage)
    .map((item, index) => (
      <tr key={`key-${index}`}>
        <td>{item.id}</td>
        <td>
          {item.img && <img src={require(`../../../assets/img/${item.img}`)} alt="Product" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '5px' }} />}
        </td>
        <td>{item.nameProd}</td>
        <td>{item.desProd}</td>
        <td>{item.up.toLocaleString()}đ</td>
        <td>{item.catName}</td>
        <td>{item.unitName}</td>
        <td>{item.rating}</td>
        <td>{item.stat}</td>
        <td>{item.viewProd}</td>
        <th><button className='btn btn-warning' onClick={() => handleEditProd(item.id)}>Sửa</button></th>
        <th><button className='btn btn-danger' onClick={() => handleDeleteProd(item.id)}>Xóa</button></th>
      </tr>
    ));

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Đơn giá</th>
            <th>Danh mục</th>
            <th>Đơn vị</th>
            <th>Đánh giá</th>
            <th>Trạng thái</th>
            <th>Lượt xem</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayProds}
        </tbody>
      </Table>
      <div className="pagination-container d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          disabledClassName={"page-item disabled"}
          activeClassName={"page-item active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
        />
      </div>
      {showEditModal && (
        <Modal_editProd
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          Id={DataToEdit.id}
          Data={DataToEdit}
        />
      )}
    </>
  );
};

export default TableProd;

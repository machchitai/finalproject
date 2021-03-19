import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, donhangs, ...rest }) => {
  const classes = useStyles();
  const [selectedDonhangIds, setSelectedDonhangIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedDonhangIds;

    if (event.target.checked) {
      newSelectedDonhangIds = donhangs.map((donhang) => donhang.ma);
    } else {
      newSelectedDonhangIds = [];
    }

    setSelectedDonhangIds(newSelectedDonhangIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDonhangIds.indexOf(id);
    let newSelectedDonhangIds = [];

    if (selectedIndex === -1) {
      newSelectedDonhangIds = newSelectedDonhangIds.concat(selectedDonhangIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDonhangIds = newSelectedDonhangIds.concat(selectedDonhangIds.slice(1));
    } else if (selectedIndex === selectedDonhangIds.length - 1) {
      newSelectedDonhangIds = newSelectedDonhangIds.concat(selectedDonhangIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDonhangIds = newSelectedDonhangIds.concat(
        selectedDonhangIds.slice(0, selectedIndex),
        selectedDonhangIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDonhangIds(newSelectedDonhangIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDonhangIds.length === donhangs.length}
                    color="primary"
                    indeterminate={
                      selectedDonhangIds.length > 0
                      && selectedDonhangIds.length < donhangs.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Mã đơn
                </TableCell>
                <TableCell>
                  Thông tin người mua
                </TableCell>
                <TableCell>
                  Sản phẩm đã mua
                </TableCell>
                <TableCell>
                  Ngày mua
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donhangs.slice(0, limit).map((donhang) => (
                <TableRow
                  hover
                  key={donhang.ma}
                  selected={selectedDonhangIds.indexOf(donhang.ma) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDonhangIds.indexOf(donhang.ma) !== -1}
                      onChange={(event) => handleSelectOne(event, donhang.ma)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      {donhang.ma_truy_xuat_dh}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <div>
                      Họ tên:
                      {donhang.ho_ten_nguoi_nhan}
                    </div>
                    <div>
                      Email:
                      {donhang.email}
                    </div>
                    <div>
                      Điện thoại:
                      {donhang.dien_thoai_nguoi_nhan}
                    </div>
                    <div>
                      Địa chỉ:
                      {donhang.dia_chi_nguoi_nhan}
                    </div>
                  </TableCell>
                  <TableCell>
                    {donhang.list_san_pham.map((sanpham) => {
                      return (
                        <div>
                          {`${sanpham.ten_san_pham} - ${sanpham.so_luong} - ${sanpham.don_gia} - ${sanpham.thanh_tien}`}
                        </div>
                      );
                    })}
                    <div>{donhang.tong_tien}</div>
                  </TableCell>
                  <TableCell>
                    {moment(donhang.ngay_tao).format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={donhangs.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  donhangs: PropTypes.array.isRequired
};

export default Results;

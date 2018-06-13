import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    }
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});
class CustomizedTable extends Component {
  constructor() {
    super();
    this.selectRow = this.selectRow.bind(this);
  }

  selectRow() {
    this.props.openOrder();
  }

  render() {
    const { classes, users, orders, services } = this.props;
    const { selectRow } = this;
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell numeric>Order ID</CustomTableCell>
            <CustomTableCell>Product</CustomTableCell>
            <CustomTableCell numeric>Quantity</CustomTableCell>
            <CustomTableCell>Unit</CustomTableCell>
            <CustomTableCell numeric>Unit Price</CustomTableCell>
            <CustomTableCell>Buyer</CustomTableCell>
            <CustomTableCell>Seller</CustomTableCell>
            <CustomTableCell>Status</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, id) => {
            const product = services && services.find(service => service.id === order.productId);
            const buyer = users && users.find(user => user.address === order.buyer);
            const seller = users && users.find(user => user.address === order.seller);
            return (
              <TableRow onClick={() => selectRow(order)} className={classes.row} hover selected={true} key={id}>
                <CustomTableCell numeric>{id}</CustomTableCell>
                <CustomTableCell>
                  {product.name}
                </CustomTableCell>
                <CustomTableCell numeric>{order.quantity}</CustomTableCell>
                <CustomTableCell>{order.unit}</CustomTableCell>
                <CustomTableCell numeric>{order.price}</CustomTableCell>
                <CustomTableCell>{buyer && buyer.name || '(none)'}</CustomTableCell>
                <CustomTableCell>{seller && seller.name || '(none)'}</CustomTableCell>
                <CustomTableCell>
                  {/* <CircularProgress value={Math.floor(Math.random() * 100)} /> */}
                  {order.status}
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);

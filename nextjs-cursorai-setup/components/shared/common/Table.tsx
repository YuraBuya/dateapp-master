import { Table as AntTable, TableProps } from 'antd';

function Table<T extends object>( {columns, dataSource, ...props}: TableProps<T>) {
  return <AntTable<T> size="small" scroll={{ x: true }} columns={columns} dataSource={dataSource} className="border border-gray-200 rounded-md" {...props} />;
}

export default Table; 
import DataTable, { createTheme } from 'react-data-table-component'

createTheme(
  'solarized',
  {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark'
)

const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
      fontSize: '22px',
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontSize: '22px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
      fontSize: '22px',
    },
  },
}

function Table({ data }) {
  function transformDataForTable(data) {
    if (!data || data.length === 0) {
      return []
    }

    const sampleObject = data[0]
    const columns = []

    for (const key in sampleObject) {
      if (sampleObject.hasOwnProperty(key)) {
        const column = {
          name: key.charAt(0).toUpperCase() + key.slice(1), // Преобразование первой буквы в заглавную
          selector: row => row[key],
          sortable: true,
        }
        columns.push(column)
      }
    }

    return columns
  }

  return (
    <DataTable
      columns={transformDataForTable(data)}
      data={data}
      customStyles={customStyles}
      // theme="solarized"
    />
  )
}

export default Table

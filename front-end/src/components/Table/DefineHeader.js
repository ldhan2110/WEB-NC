


export const ITEMS_HEADERS = {
  hasActions: true,
  hasCheckbox: false,
  headerCells: [  
  { id: 'id', alignment: 'left', label: 'ID',type: 'text' },
  { id: 'item_name', alignment: 'left', label: 'Item Name',type: 'text' },
  { id: 'item_owner', alignment: 'left', label: 'Owner', type: "text" },
  { id: 'status', alignment: 'left', label: 'Status',type: 'label' },
  { id: 'create_date', alignment: 'left', label: 'Create Date',type: 'text' },
]}

export const MEMBERS_HEADERS = {
  hasActions: true,
  hasCheckbox: false,
  headerCells: [
    { id: 'id', alignment: 'left', label: 'ID', type: 'text', hidden: true },
    { id: 'name', alignment: 'left', label: 'Name',type: 'text' },
    { id: 'email', alignment: 'left', label: 'Email',type: 'text' },
    { id: 'role', alignment: 'left', label: 'Roles',type: 'label' },
    { id: 'status', alignment: 'left', label: 'Status',type: 'label' },
  ]
}







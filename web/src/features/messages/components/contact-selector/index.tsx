import {
  FormControl, InputLabel, Select, MenuItem,
  Checkbox, ListItemText, OutlinedInput,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import type { Contact } from '@/types'

interface ContactSelectorProps {
  contacts: Contact[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
  error?: boolean
  disabled?: boolean
}

export function ContactSelector({ contacts, selectedIds, onChange, error, disabled }: ContactSelectorProps) {
  const handleChange = (e: SelectChangeEvent<string[]>) => {
    onChange(e.target.value as string[])
  }

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      <InputLabel>Contatos *</InputLabel>
      <Select
        multiple
        value={selectedIds}
        onChange={handleChange}
        input={<OutlinedInput label="Contatos *" />}
        renderValue={(selected) =>
          contacts
            .filter((c) => selected.includes(c.id))
            .map((c) => c.name)
            .join(', ')
        }
      >
        {contacts.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            <Checkbox checked={selectedIds.includes(c.id)} />
            <ListItemText primary={c.name} secondary={c.phone} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

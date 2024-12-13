// todo-app.js

import React, { useState } from 'react';
import {
  Box,
  Button,
  expandRecord,
  FieldPickerSynced,
  FormField,
  Icon,
  Input,
  TablePickerSynced,
  useBase,
  useGlobalConfig,
  useRecords,
  ViewPickerSynced,
} from '@airtable/blocks/ui';
import { FieldType } from '@airtable/blocks/models';

export default function TodoApp() {
  const base = useBase();

  const globalConfig = useGlobalConfig();
  const tableId = globalConfig.get('selectedTableId');
  const viewId = globalConfig.get('selectedViewId');
  const doneFieldId = globalConfig.get('selectedDoneFieldId');
  const priorityFieldId = globalConfig.get('selectedPriorityFieldId');

  const table = base.getTableByIdIfExists(tableId);
  const view = table ? table.getViewByIdIfExists(viewId) : null;
  const doneField = table ? table.getFieldByIdIfExists(doneFieldId) : null;
  const priorityField = table ? table.getFieldByIdIfExists(priorityFieldId) : null;

  const records = useRecords(doneField && priorityField ? view : null, {
    fields: doneField && priorityField ? [table.primaryField, doneField, priorityField] : [],
    sorts: priorityField ? [{ field: priorityField, direction: 'asc' }] : [],
  });

  const tasks = records
    ? records.map(record => (
      <Task key={record.id} record={record} table={table} doneField={doneField} priorityField={priorityField} />
    ))
    : null;

  return (
    <div>
      <Box padding={3} borderBottom="thick">
        <FormField label="Table">
          <TablePickerSynced globalConfigKey="selectedTableId" />
        </FormField>
        <FormField label="View">
          <ViewPickerSynced table={table} globalConfigKey="selectedViewId" />
        </FormField>
        <FormField label="Done Field" marginBottom={0}>
          <FieldPickerSynced
            table={table}
            globalConfigKey="selectedDoneFieldId"
            placeholder="Pick a 'done' field..."
            allowedTypes={[FieldType.CHECKBOX]}
          />
        </FormField>
        <FormField label="Priority Field" marginBottom={0}>
          <FieldPickerSynced
            table={table}
            globalConfigKey="selectedPriorityFieldId"
            placeholder="Pick a 'priority' field..."
            allowedTypes={[FieldType.SINGLE_LINE_TEXT]}
          />
        </FormField>
      </Box>
      {tasks}
      {table && doneField && priorityField && <AddTaskForm table={table} priorityField={priorityField} />}
    </div>
  );
}

function Task({ record, table, doneField, priorityField }) {
  return (
    <Box
      fontSize={4}
      paddingX={3}
      paddingY={2}
      marginRight={-2}
      borderBottom="default"
      display="flex"
      alignItems="center"
    >
      <TaskDoneCheckbox table={table} record={record} doneField={doneField} />
      <a
        style={{ cursor: 'pointer', flex: 'auto', padding: 8 }}
        onClick={() => {
          expandRecord(record);
        }}
      >
        {record.name || 'Unnamed record'} - Priority: {record.getCellValue(priorityField) || 'None'}
      </a>
      <TaskDeleteButton table={table} record={record} />
    </Box>
  );
}

function TaskDoneCheckbox({ table, record, doneField }) {
  function onChange(event) {
    table.updateRecordAsync(record, {
      [doneField.id]: event.currentTarget.checked,
    });
  }

  const permissionCheck = table.checkPermissionsForUpdateRecord(record, {
    [doneField.id]: undefined,
  });

  return (
    <input
      type="checkbox"
      checked={!!record.getCellValue(doneField)}
      onChange={onChange}
      style={{ marginRight: 8 }}
      disabled={!permissionCheck.hasPermission}
    />
  );
}

function TaskDeleteButton({ table, record }) {
  function onClick() {
    table.deleteRecordAsync(record);
  }

  return (
    <Button
      variant="secondary"
      marginLeft={1}
      onClick={onClick}
      disabled={!table.hasPermissionToDeleteRecord(record)}
    >
      <Icon name="x" style={{ display: 'flex' }} />
    </Button>
  );
}

function AddTaskForm({ table, priorityField }) {
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setTaskPriority] = useState('');

  function onInputChange(event) {
    setTaskName(event.currentTarget.value);
  }

  function onPriorityChange(event) {
    setTaskPriority(event.currentTarget.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    table.createRecordAsync({
      [table.primaryField.id]: taskName,
      [priorityField.id]: taskPriority,
    });
    setTaskName('');
    setTaskPriority('');
  }

  const isFormEnabled = table.hasPermissionToCreateRecord({
    [table.primaryField.id]: undefined,
    [priorityField.id]: undefined,
  });

  return (
    <form onSubmit={onSubmit}>
      <Box display="flex" padding={3}>
        <Input
          flex="auto"
          value={taskName}
          placeholder="New task"
          onChange={onInputChange}
          disabled={!isFormEnabled}
        />
        <Input
          flex="auto"
          value={taskPriority}
          placeholder="Priority (e.g., High, Medium, Low)"
          onChange={onPriorityChange}
          disabled={!isFormEnabled}
          marginLeft={2}
        />
        <Button variant="primary" marginLeft={2} type="submit" disabled={!isFormEnabled}>
          Add
        </Button>
      </Box>
    </form>
  );
}

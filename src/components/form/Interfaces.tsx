// Interface definition
export interface Task {
  id: number;
  descripcion: string;
  dateCreated: number;
  completed: boolean;
}

//  Definition of a property interface
export interface Props {
  tasks: Task[];
  setTaskState: React.Dispatch<React.SetStateAction<Task>>;
}

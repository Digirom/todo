import { ApplicationSettings } from "@nativescript/core";

export function setTask(name, tasks) {
  const arr = JSON.stringify(tasks)

  ApplicationSettings.setString(name, arr);
}

export function getTasks(name) {
  const tasks = ApplicationSettings.getString(name);

  if (tasks) {
    return JSON.parse(tasks)
  }
  else return []
}

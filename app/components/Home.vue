<template>
  <Page class="page">
    <ActionBar title="Google ToDo" class="action-bar"/>
    <TabView
      height="100%"
      android-tabs-position="bottom"
      selected-tab-text-color="#53ba82"
      tab-text-font-size="33"
    >
      <TabViewItem title="Active tasks" text-transform="uppercase">
        <StackLayout
          orientation="vertical"
          width="100%"
          height="100%"
        >
          <GridLayout
            columns="2*,*"
            rows="*"
            width="100%"
            height="14%"
          >
            <TextField
              v-model="newTask"
              col="0"
              row="0"
              hint="New task, enter..."
              editable="true"
              @returnPress="onButtonTap"
            />
            <Button
              col="1"
              row="0"
              text="Add"
              @tap="onButtonTap"
            />
          </GridLayout>
          <ListView
            class="list-group"
            for="todo in todos"
            style="height:75%"
            separator-color="transparent"
            @itemTap="onItemTap"
          >
            <v-template>
              <Label
                id="active-task"
                :text="todo.name"
                class="list-group-item-heading"
                text-wrap="true"
              />
            </v-template>
          </ListView>
        </StackLayout>
      </TabViewItem>

      <TabViewItem title="Complete tasks" text-transform="uppercase">
        <ListView
          class="list-group"
          for="done in dones"
          style="height:75%"
          separator-color="transparent"
          @itemTap="onDoneTap"
        >
          <v-template>
            <Label
              id="completed-task"
              :text="done.name"
              class="list-group-item-heading"
              text-wrap="true"
            />
          </v-template>
        </ListView>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>

import { getTasks, setTask } from '@/storage.js'

export default {
  data() {
    return {
      dones: [],
      todos: [],
      newTask: '',
    };
  },
  created() {
    this.todos = getTasks('todos')
    this.dones = getTasks('dones')
  },
  methods: {
    onItemTap(args) {

      action('Select', 'Close', [
        'Complete',
        'Delete',
      ]).then(result => {
        switch (result) {
          case 'Complete':
            this.dones.unshift(args.item);
            this.todos.splice(args.index, 1);
            break;
          case 'Delete':
            this.todos.splice(args.index, 1);
            break;
          case 'Close' || undefined:
            break;
        }
        setTask('todos', this.todos)
        setTask('dones', this.dones)
      });
    },
    onDoneTap: function(args) {
      action('Select', 'Close', [
        'Repeat',
        'Delete',
      ]).then(result => {
        switch (result) {
          case 'Repeat':
            this.todos.unshift(args.item);
            this.dones.splice(args.index, 1);
            break;
          case 'Delete':
            this.dones.splice(args.index, 1);
            break;
          case 'Close' || undefined:
            break;
        }
        setTask('todos', this.todos)
        setTask('dones', this.dones)
      });
    },
    onButtonTap() {
      if (!this.newTask) return;

      this.todos.unshift({
        name: this.newTask,
      });

      setTask('todos', this.todos)
      
      this.newTask = '';
    },
  },
};
</script>

<style scoped>
TextField {
  font-size: 20;
  color: #53ba82;
  margin-top: 10;
  margin-bottom: 10;
  margin-right: 5;
  margin-left: 20;
  height: 60;
}
button {
  font-size: 17;
  font-weight: bold;
  color: rgb(252, 0, 0);
  background-color: #d0f226;
  height: 40;
  margin-top: 10;
  margin-bottom: 10;
  margin-right: 10;
  margin-left: 10;
  border-radius: 20px;
}
#active-task {
  font-size: 16;
  font-weight: bold;
  color: #2daccf;
  margin-left: 20;
  padding-top: 5;
  padding-bottom: 10;
}
#completed-task {
  font-size: 16;
  color: #d3d3d3;
  margin-left: 20;
  padding-top: 5;
  padding-bottom: 10;
  text-decoration: line-through;
}
</style>
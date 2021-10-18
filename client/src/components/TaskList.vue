<template>
    <h1>TODO</h1>
    <div class="container">
        <div class="filter-bar">
            <button class="link-button" @click="getTasks('all')">All</button> | <button class="link-button" @click="getTasks('incomplete')">Incomplete</button> | <button class="link-button" @click="getTasks('completed')">Completed</button>
        </div>
        <div class="task-list">
            <div class="task-single" v-for="(task, index) in tasks">
                <div class="task-col-left task-is-done"><input type="checkbox" id="checkbox" v-model="task.is_done" @change="createOrModifyTask(task)"/></div>
                <div class="task-col-middle task-description"><textarea class="task-description-text" v-model="task.task_description" @blur="createOrModifyTask(task)"></textarea></div>
                <div class="task-col-right delete-task"><button class="link-button" @click="deleteTask(task, index)">x</button></div>
            </div>
        </div>
        <div class="task-input">
            <form @submit.prevent="onSubmit">
                <div class="task-single">
                    <div class="task-inputs">
                        <textarea class="task-description-text add-task-textarea" placeholder="Add task..." v-model="newTaskDesc"></textarea><button class="new-task-button" type="submit">Add</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import TaskService from '../services/task.service';
    import { mapGetters } from 'vuex';

    export default defineComponent({
        name: 'task-list-component',
        data () {
            return { 
                tasks: [],
                newTaskDesc: ''
            };
        },
        methods: {
            async getTasks(filter) {
                this.tasks = await TaskService.getTasks(filter);
            },
            async createOrModifyTask(task) {
                return await TaskService.createOrModifyTask(task);
            },
            async deleteTask(task, index) {
                this.tasks.splice(index, 1);
                TaskService.deleteTask(task);
            },
            async onSubmit() {
                let newTask = await this.createOrModifyTask({ task_description: this.newTaskDesc  })
                this.tasks.push(newTask);
                this.newTaskDesc = '';
            }
        },
        async created() {
            this.getTasks('all');
        }
    });
</script>
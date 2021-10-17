<template>
    <h1>TODO</h1>
    <div class="container">
        <div class="task-list">
            <div class="task-single" v-for="(task, index) in tasks">
                <div class="task-col-left task-is-done"><input type="checkbox" id="checkbox" v-model="task.is_done" @change="createOrModifyTask(task)"/></div>
                <div class="task-col-middle task-description"><textarea class="task-description-text" v-model="task.task_description" @blur="createOrModifyTask(task)"></textarea></div>
                <div class="task-col-right delete-task"><a href="#" @click="deleteTask(task, index)">x</a></div>
            </div>
        </div>
        <div class="task-input">
            
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import TaskService from '../services/task.service';
    import { mapGetters } from 'vuex';

    export default defineComponent({
        name: 'task-list-component',
        computed: {
            ...mapGetters(["getToken"])
        },
        data () {
            return { tasks: [] };
        },
        methods: {
            async getTasks() {
                return await TaskService.getTasks(this.getToken);
            },
            async createOrModifyTask(task) {
                TaskService.createOrModifyTask(this.getToken, task);
            },
            async deleteTask(task, index) {
                this.tasks.splice(index, 1);
                TaskService.deleteTask(this.getToken, task);
            }
        },
        async created() {
            this.tasks = await this.getTasks();
        }
    });
</script>
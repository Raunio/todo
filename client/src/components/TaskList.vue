<template>
    <h1>TODO</h1>
    <div class="container">
        <div class="task-list">
            <div class="task-col task-is-done" v-for="task in tasks">{{ task.is_done }}</div>
            <div class="task-col task-description" v-for="task in tasks">{{ task.task_description }}</div>
            <div class="task-col delete-task"><span>x</span></div>
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
            async createOrModifyTask() {
                TaskService.createOrModifyTask(this.getToken);
            },
            async deleteTask() {
                TaskService.deleteTask(this.getToken);
            }
        },
        async created() {
            this.tasks = await this.getTasks();
        }
    });
</script>
<template>
    <Page>
        <!-- <ActionBar>
            <Label text="Home"/>
        </ActionBar> -->

        <StackLayout>
            <Label class="info">
                <FormattedString>
                    <Span :text="message"/>
                </FormattedString>
            </Label>
            <TextField v-model="newTodo" hint="Enter todo..." />
            <Button text="Add Todo" @tap="btnAddTodo" />
            <ListView for="todo in myTodos" @itemTap="onItemTap"
            style="height:1250px">
                <v-template>
                    <FlexboxLayout flexDirection="row">
                        <Label :text="todo" class="t-12"
                            style="width: 60%" />
                    </FlexboxLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
  export default {
    data: () => ({
        message: 'My Todo List App',
        myTodos: [],
        newTodo: '',
    }),
    methods:{
     btnAddTodo(){
         this.myTodos.push(this.newTodo)
     }   
    },
  };
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>

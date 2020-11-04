<template>
    <Page>
    <!-- <ActionBar :title="title">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar> -->
        <StackLayout>
        <Label text="My Todos" fontWeight="Bold" class="header"></Label>
        <TextField v-model="newTodo" hint="Enter text..." />
        <Button text="Add Todo" @tap="btnAddTodo"></Button>

        <RadListView ref="listView"
                   for="todo in myTodos"
                   pullToRefresh="true"
                   @pullToRefreshInitiated="onPullToRefreshInitiated"
                   swipeActions="true"
                   @itemSwipeProgressStarted="onSwipeStarted">
        <v-template>
          <StackLayout style="padding: 50px; background-color: white" orientation="vertical">
            <Label :text="todo" class="nameLabel"></Label>
            <!-- <Label :text="todo" class="descriptionLabel"></Label> -->
          </StackLayout>
        </v-template>

        <v-template name="itemswipe">
          <GridLayout columns="auto, *, auto" backgroundColor="White">
            <StackLayout id="mark-view" col="0" class="swipe-item left green"
                         orientation="horizontal" @tap="onLeftSwipeClick">
              <Label text="mark" verticalAlignment="center" horizontalAlignment="center"/>
            </StackLayout>
            <StackLayout id="delete-view" col="2" class="swipe-item right red"
                         orientation="horizontal" @tap="onRightSwipeClick">
              <Label text="delete" verticalAlignment="center" horizontalAlignment="center" />
            </StackLayout>
          </GridLayout>
        </v-template>
        </RadListView>
        </StackLayout>
  </Page>
</template>

<script>
  export default {
    data: () => ({
        message: 'My Todo List App',
        myTodos: ['Clean','Wash the dishes','Go for a walk'],
        newTodo: '',
        selectedItems: []
    }),
    methods:{
        btnAddTodo(){
         if(this.newTodo == ''){
             alert({
                 title: '⚠ Warning',
                 message: 'Todo is empty',
                 okButtonText: 'Okay'
             })
         }
         else{
            this.myTodos.push(this.newTodo)
            this.newTodo = ''
         }
        },
        onSwipeStarted ({ data, object }) {
            console.log(`Swipe started`);
            const swipeLimits = data.swipeLimits;
            const swipeView = object;
            const leftItem = swipeView.getViewById('mark-view');
            const rightItem = swipeView.getViewById('delete-view');
            swipeLimits.left = leftItem.getMeasuredWidth();
            swipeLimits.right = rightItem.getMeasuredWidth();
            swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
        },
        onLeftSwipeClick (event) {
            console.log('left action tapped');
        },
        onRightSwipeClick({ object }) {
            var index = this.myTodos.indexOf(object.bindingContext);
            this.myTodos.splice(index, 1);
        },
        onNavigationButtonTap() {
            Frame.topmost().goBack();
        },
        onPullToRefreshInitiated({ object }){
            // this.myTodos.push(['Clean','Wash the dishes','Go for a walk'])
            this.$nextTick(() => {
                this.myTodos.push(['Clean'],['Wash the dishes'],['Go for a walk']);
                object.notifyPullToRefreshFinished();
            })
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
    .green{
        background-color: green !important;
        color: white;
    }
    .red{
        background-color:red;
        color: white;
    }
    .header{
        vertical-align: center;
        horizontal-align: center;
        font-size: 30px;
        margin-top: 10px;
    }
</style>

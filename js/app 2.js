

var Post = Backbone.Model.extend({
	initialize: function(){
		var d = (new Date()).toDateString().substring(3, 10);
		this.set('date', d);
		console.log("new post model");
	},
	defaults: {
		jobTitle: "Senior UI designer",
		date: "",
		companyName: "Basecamp",
		site: "www.basecamp.com",
		description: "Lorem ipsum",
		requirements: "One, two, three",
		location: "Chicago",
		aboutUs: "Lorem ipsum",
		apply: ""
	}
});


var PostView = Backbone.View.extend({
	initialize: function(){return console.log("new view")},
	model: Post,
	tagName: "section",
	template: _.template($("#tplPost").html()),
	render: function(){
		this.$el.html(this.template(this.model.toJSON() ));
		return this;
	},
	events: {
		"click" : "fullView"
	},
	fullView : function(){
		$('main').empty();		
		console.log(this.model.get('jobTitle'));
		var m = this.model;
		var v = new PostViewFull({model: m});
		v.render().el;
	}
});

var PostViewFull = Backbone.View.extend({
	initialize: function(){return console.log("new post full view")},
	model: Post,
	tagName: "section",
	template: _.template($("#tplPost").html()),
	render: function(){
		this.$el.html(this.template(this.model.toJSON() ));
		return this;
	}
});


var PostCollection = Backbone.Collection.extend({
	model: Post
});


var PostViewCollection = Backbone.View.extend({
	el:"main",
	initialize: function(posts){
		console.log("new collection view");
		this.collection = new PostCollection(posts);
		this.render();
	},
	render: function(){
		this.collection.each(function(item){
			this.renderPost(item);
		}, this);
	},
	renderPost: function(item){
		var postView = new PostView({
			model: item
		});
		this.$el.append(postView.render().el);
	}
		
	});


var posts = [new Post({jobTitle:"First"}),new Post({jobTitle:"Second"}),new Post({jobTitle:"Third"})]

var list = new PostViewCollection(posts);




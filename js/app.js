
var eventAggregator = _.extend({}, Backbone.Events);

var Post = Backbone.Model.extend({
	initialize: function(){
		var d = (new Date()).toDateString().substring(3, 10);
		this.set('date', d);
		console.log("new post model");
	},
	defaults: {
		jobTitle: "awesome",
		date: "",
		companyName: "awesome company",
		site: "www.awesome.com",
		description: "",
		requirements: "",
		location: "",
		aboutUs: "",
		apply: ""
	}
});

var createPostView = Backbone.View.extend({
	initialize: function(){return console.log("create new post view")},
	model: Post,
	tagName: "section",
	id: "createPost",
	className: "animated fadeInDown",
	template: _.template($("#createPost").html()),
	render: function(){
		this.$el.html(this.template(this.model.toJSON() ));
		return this;
	},
	events: {
		"click #post" : function(e){
			e.preventDefault();
			var jobTitle = $('#jobTitle').html();
			var companyName = $('#companyName').html();
			var site = $('#site').html();
			var description = $('#description').html();
			var requirements = $('#requirements').html();		
			var location = $('#location').html();						
			var aboutUs = $('#aboutUs').html();
			var applyJob = $('#applyJob').html();												
			
			this.model.set('jobTitle', jobTitle);
			this.model.set('companyName', companyName);
			this.model.set('site', site);
			this.model.set('description', description);
			this.model.set('requirements', requirements);
			this.model.set('location', location);
			this.model.set('aboutUs', aboutUs);	
			this.model.set('applyJob', applyJob);							
													
			if(!jobTitle){
				$('#jobTitle').addClass("animated shake");
			} else {
				postsCollection.add(this.model, {at: 0});
				app.navigate("mainView", {trigger: true});
			}
		}
	}
});

var PostView = Backbone.View.extend({
	initialize: function(){return console.log("new view")},
	model: Post,
	tagName: "section",
	className: "singlePost animated fadeInDown",
	template: _.template($("#tplPost").html()),
	render: function(){
		this.$el.html(this.template(this.model.toJSON() ));
		return this;
	},
	events: {
		"click" : function(){
		eventAggregator.trigger('post:selected', this.model);
		console.log(this.model.get('jobTitle'));
		}
	}
});

var PostViewFull = Backbone.View.extend({
	initialize: function(){return console.log("new full view")},
	model: Post,
	tagName: "section",
	id: "fullViewPost",
	className: "animated fadeInDown",
	template: _.template($("#tplPostFull").html()),
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
		this.collection = postsCollection;
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


var Router = Backbone.Router.extend({
	routes: {
		"mainView" : "mainView",
		"createPost" : "createPost",
		"postView/:jobTitle" : "postView"
	},
	mainView: function(){
		$('main').empty();
		$('main section').html(new PostViewCollection(postsCollection));
		$('header .arrow').removeClass("show");
	},
	createPost: function(){
		$('main').empty().html(new createPostView({model:new Post()}).render().el);
	},
	postView: function(jobTitle){
		var selectedPost = postsCollection.find(function(post){
			return post.get('jobTitle') === jobTitle;});
		$('main').empty().html(new PostViewFull({model: selectedPost}).render().el);
		$('header .arrow').addClass("show");
	}	
	
});

var postsCollection = new PostCollection([{jobTitle:"First"},{jobTitle:"Second"},{jobTitle:"Third"}]);



eventAggregator.on('post:selected', function(post){
	var urlPath = 'postView/' + post.get('jobTitle');
	app.navigate(urlPath, {trigger: true});
	console.log("the aggregator");
})

var app = new Router();
Backbone.history.start();

app.navigate("mainView", {trigger: true});







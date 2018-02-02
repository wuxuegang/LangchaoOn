var map;
var baseUrl="http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer";
var localUrl = "http://10.110.1.105:6080/arcgis/rest/services/maps/sdWaterMaps/MapServer";
var dUrl = "http://localhost:6080/arcgis/rest/services/air_lili/MapServer/5";
var countyUrl = "http://localhost:6080/arcgis/rest/services/air_lili/MapServer/5";
			require([
				"esri/map","esri/geometry/Extent",
				"esri/layers/ArcGISTiledMapServiceLayer",
				"esri/layers/ArcGISDynamicMapServiceLayer",
				"esri/layers/GraphicsLayer",
				 "esri/InfoTemplate",
				"esri/layers/FeatureLayer",
				 "esri/tasks/ClassBreaksDefinition", 					"esri/tasks/AlgorithmicColorRamp",
        			"esri/tasks/GenerateRendererParameters", 					"esri/tasks/GenerateRendererTask",
       				 "esri/symbols/SimpleLineSymbol", 
       				 "esri/symbols/SimpleFillSymbol",
       				  "esri/renderers/ClassBreaksRenderer",
       				  "esri/Color",
				"extras/PiesLayer",
				"esri/tasks/QueryTask",
     			"esri/tasks/query",
     			 "esri/graphic",
     			 "esri/dijit/gauge",
     			 "dojox/dgauges/components/classic/SemiCircularLinearGauge",
     			 "dojox/dgauges/components/default/SemiCircularLinearGauge",
     			 "dojox/dgauges/components/green/SemiCircularLinearGauge",
     			 "dojox/dgauges/components/grey/SemiCircularLinearGauge",
				  "dojox/dgauges/components/black/SemiCircularLinearGauge",
				  "dojox/dgauges/components/green/CircularLinearGauge",
					"dojox/dgauges/components/grey/CircularLinearGauge",
					"dojox/dgauges/components/classic/CircularLinearGauge",
					"dojox/dgauges/components/black/CircularLinearGauge",
					
     			 
				
				"dojox/charting/action2d/Highlight",
				"dojox/charting/action2d/Magnify",
				"dojox/charting/action2d/Tooltip",
				"dojox/charting/action2d/MoveSlice",
				"dojox/charting/Chart2D",
				"dojox/charting/Chart",
				"dojox/charting/plot2d/Lines",
				"dojox/charting/plot2d/Bars",
				"dojox/charting/plot2d/Columns",
				"dojox/charting/plot2d/StackedBars",

				"dojox/charting/plot2d/ClusteredColumns",
				"dojox/charting/themes/Harmony",
				"dojox/charting/themes/ThreeD",
				"dojox/charting/plot2d/StackedColumns",
				"dojox/grid/DataGrid",
				"dojo/data/ItemFileReadStore",
				
				"dojox/gfx3d/matrix",
				"dojox/charting/Chart3D",
				"dojox/charting/plot3d/Bars",
				"dojo/fx/easing",
				
				
				"dojo/query",
				"dojo/on",
				"dojo/dom",
				"dojo/parser",
				"dojox/grid/DataGrid",
				"dojo/domReady!"
			], function(
				Map, Extent, ArcGISTiledMapServiceLayer,
				ArcGISDynamicMapServiceLayer,
				GraphicsLayer,
				InfoTemplate,
				FeatureLayer,ClassBreaksDefinition, AlgorithmicColorRamp,
				GenerateRendererParameters, GenerateRendererTask,
				SimpleLineSymbol,
				SimpleFillSymbol,
				ClassBreaksRenderer,
				Color,PiesLayer,
				QueryTask, Query,
				Graphic,
				Gauge,
				classicSemiCircularLinearGauge,
				defaultSemiCircularLinearGauge,
				greenSemiCircularLinearGauge,
				greySemiCircularLinearGauge,
				blackSemiCircularLinearGauge,
				greenCircularLinearGauge,
				greyCircularLinearGauge,
				classicCircularLinearGauge,
				blackCircularLinearGauge,
				
				Highlight,Magnify,Tooltip,MoveSlice,
				Chart2D,
				Chart, Plot2dLines,Bars, Columns,StackedBars, ClusteredColumns, 
				Harmony, ThreeD,
				StackedColumns,
				DataGrid, ItemFileReadStore,
				
				Matrix,Chart3D, plot3dBars,
				easing,
				
				query, on, dom, parser
			){
				parser.parse();
				
				//console.log(location.href);
				//console.log(window.location.host);
				
				var pieData;
				var wash;
				var gauge;
				var graphicsLayer = new GraphicsLayer();
				
				//私人定制
				var initExtent = new Extent({
					"xmin": 8176078.237599999,
					"ymin": 704818.0274999999,
					"xmax": 1.5037685885700002E7,
					"ymax":  7086873.4196000025,
					"spatialReference":{
						"wkid":102100
					}
				});
				
				
				map = new Map("map",{
					extent:initExtent,
					slider:false
				});
				var blayer = new ArcGISTiledMapServiceLayer(baseUrl);
				map.addLayer(blayer);
				
				map.addLayer(graphicsLayer);
				
				var pielayer;
				var pielayerR;
				
				map.on("load", function(){
					//接口流程
					//showIndicators();
					var data = indicators;
					intializeMenu(data);
					//formchartBar3D();
				});
				map.on("extent-change",function(evt){
        			//console.log(evt);
        			//pielayer.setPieRadius();
        			
        		});
        		map.on("zoom-end",function(evt){
//        			console.log(evt);
//      			pielayerR = pielayerR*evt.zoomFactor;
//      			if(pielayer){
//      				pielayer.setPieRadius(pielayerR);
//      			
//      			}
        		});
        		
        		
				
        		function showCode(code){
		        	console.log(code);
		        };
		        
		        function intializeMenu(data){
		        	var content = "";
		        	//console.log(data);
		        	for(var i = 0; i < data.length; i++){
		        		content += "<li id='"+data[i].code+"'>"+data[i].name+"</li>";
		        		
		        	}
		        	//console.log(content);
		        	dom.byId("races").innerHTML = content;
		        	
		        	for(var j = 0; j< data.length; j++){
		        		
		        		if(query("#"+data[j].code)){
		        			//console.log(query("#"+data[j].code));
		        			var id = dom.byId(data[j].code).id;
		        			//console.log(id);
		        			on(dom.byId(id),'click', function(evt){
		        				addFeature(this.id);
		        			});
		        		}
		        		
		        	}
		        	
		        }
		        
		        function addFeature(element){
		        	console.log(element);
		        	var type = element;
		        	if(type){
		        		
		        		clearClass(query("#subContainer"));
						query("#subContainer").addClass("subContainer11");
						clearClass(query("#subSwitcher"));
						query("#subSwitcher").addClass("sub_switcher11");
						dom.byId("stastics").style.display = "block";
		        		dom.byId("subSwitcher").src = "images/right_big.png";
		        		subFlag = 1;
		        		switch(type){
		        			case "elcbmjhzb":
		        				generateRender();
		        				subContainerPie("elcbmjhzb");
		        				//subContainerGauge("elcbmjhzb");
		        				populateGrid("elcbmjhzb");
		        				formingData();
		        				thirdContainerStackBars("elcbmjhzb");
		        				break;
		        			case "tudi":
		        				classBreakRender();
		        				break;
		        			case "tudi":
		        				classBreakRender();
		        				break;
		        		}
		        	}
		        	
		        }
		        
		        function subContainerGauge(type){
		        	if(type == "elcbmjhzb"){
//		        			gauge = new Gauge({
//		        				"minimum":0,
//								"maximum":1000,
//								"animationDuration":1200
//		        			},"pieChart");
		        			
		        			//gauge.startup();
							gauge = new greenSemiCircularLinearGauge({
								"minimum":0,
								"maximum":1000,
								"majorTickInterval":250,
								"title":"人口统计",
								"nochange":false,
								"textIndicatorColor":"red",
								"tooltip":"dsds",
								"animationDuration":1200
							}, dom.byId("pieChart"));
							gauge.resize(245,245);
							gauge.startup();
							
		        	}
		        }
		        function subContainerPie(type){
		        	if(type == "elcbmjhzb"){
		        		console.log("开始绘制二级饼图");
		        		var pieData1 = new Array();
		        		var data = rendering_array;
		        		console.log(data);
		        		var total = 0;
		        		for(var k = 0; k < data.length; k++){
		        			total += data[k].value;
		        		}
		        		for(var i = 0; i < data.length; i++){
		        			pieData1.push(
		        				{ 	y: data[i].value,
		        					tooltip:data[i].NAME,
		        					code:data[i].DIST_CODE
		        				});
		        		}
		        		console.log(pieData1);
		        		
		        		dom.byId("pieChart").innerHTML = "";
		        		var chart = new Chart("pieChart");
		        		chart.setTheme(ThreeD);
		        		chart.addPlot("default", {type: "Pie",label:true}) 		
  							.addSeries("POP", pieData1);
  						
  						 var anim1 = new Highlight(chart,'default',{highlight:new Color([25,255,0,0.6])});
  						 var magnify = new Magnify(chart, "default",{scale:1.2});
				  		var anim2 = new Tooltip(chart,'default');
  						var anim3 = new MoveSlice(chart,'default');
  						chart.render();
  						
  						chart.connectToPlot("default",function(args){
  							if(args.type == "onclick"){
  								//console.log(args);
  								var code = args.chart.series[0].data[args.index].code;
  								var name = args.chart.series[0].data[args.index].tooltip;
  								console.log(name+ " "+code);
  								
  								var expression = "DIST_CODE = '"+code+"'";
			        		wash.setDefinitionExpression(expression);
  								
  								graphicsLayer.clear();
  								var query = new Query();
				        		query.where = "Code = '"+code+"'";
				        		query.returnGeometry = true;
				        		query.outFields = ["*"];
				        		//console.log(query);
				        		var queryTask = new QueryTask(dUrl);
				        		queryTask.execute(query, function(fs){
				        			console.log(fs);
				        			var extent = fs.features[0].geometry.getExtent().expand(2.5);
				        			map.setExtent(extent);
				        			 
						            var outline = SimpleLineSymbol("solid", new Color([116,254,101,0.6]), 3);
					            var symbol1 = new SimpleFillSymbol()
					            		.setColor(new Color([255,255,0,0.15]))
					            		.setOutline(outline);
						            var geometry1 = fs.features[0].geometry;
						            graphic1 = new Graphic(geometry1, symbol1);
						            graphicsLayer.add(graphic1);
						            
				        		});
  							}
  						});

		        	}
		        }
		        
		        function thirdContainerStackBars(type){
		        	if(type == "elcbmjhzb"){
		        		
		        		console.log("开始绘制三级柱状图");
		        		var pieData1 = new Array();
		        		var barNames = new Array();
		        		var data = rendering_array;
//		        		console.log("柱状图数据",data);
		        		for(var i = 0; i < data.length; i++){
		        			pieData1.push(data[i].value[0]);
		        			barNames.push({"value":(i+1),"text":data[i].NAME[0]});
		        		}
		        		
		        		
		        		dom.byId("barChart").innerHTML = "";
		        		var chart = new Chart("barChart");
		        		chart.setTheme(Harmony);
		        		console.log("三级柱图绘制数据", pieData1);
		        		chart.addPlot("default", {type: "StackedBars", gap:5 ,styleFunc: function(item){
		        			console.log("三级图",item);
		        			
		        			if( 349 < item&&item < 500){
		        				return  {fill:"red"};
		        			}
		        			else if(350>item&&item > 299){
		        				return {fill: "yellow"};
		        			} else if(149 <item&&item <300){
		        				return {fill:"green"};
		        			}
		        			else if(0 <item&&item <150){
		        				return {fill:"blue"};
		        			}
		        			return {fill:"blue"};
		        		},
		        			animate:{duration:5000,easing:easing.linear}
		        		})
		        			.addAxis("x",{fontColor: "white",min:0, max:1000, fixLower:"major", fixUpper:"major"})
		        			.addAxis("y", {fontColor: "white", vertical: true, labels:barNames
		        			})
  							.addSeries("POP", pieData1,{plot:"default"});
  						
  						 var anim1 = new Highlight(chart,'default');
  						 
				  		 var anim2 = new Tooltip(chart,'default',{
				  			text:function(e){				  				
				  				var value = e.chart.series[0].data[e.index];
				  				return value;
				  			}
				  		});				  		
  						
  						chart.render();  
  						
  						
		        	}
		        }
		        
		        function populateGrid(type){
		        	if(type == "elcbmjhzb"){
		        		console.log("开始填充二级表格");
		        		var gridData = rendering_array;
		        		
		        		var data = {
		        			items: gridData
		        		}
		        		var store = new ItemFileReadStore({
		        			data:data
		        		});
		        		
		        		var struc = [{	        			
		        			name:"名称",
		        			field:"NAME"
		        		},{
		        			name:"值",
		        			field:"value"
		        		}];
		        		
		        		grid.setStructure(struc);
	          			grid.setStore(store);
		        		
		        		dojo.connect(grid, "onSelected",function(item){
		        			//map.removeLayer(wash);
		        			graphicsLayer.clear();
		        			console.log("grid点击数据",grid.getItem(item));
		        			
		        			//仪表盘变动	        			
		        			gauge.refreshRendering();			        							gauge.set("value",parseInt(grid.getItem(item).value[0]));
		        			
		        			
			        		var code = grid.getItem(item).DIST_CODE[0];
			        		//console.log(grid.getItem(item).DIST_CODE[0]);
			        		var expression = "DIST_CODE = '"+code+"'";
			        		wash.setDefinitionExpression(expression);
			        		
			        		var query = new Query();			        		
			        		query.where = "Code = '"+code+"'";
			        		query.returnGeometry = true;
			        		query.outFields = ["*"];
			        		//console.log(query);
			        		var queryTask = new QueryTask(countyUrl);
			        		queryTask.execute(query, function(fs){
			        			//console.log(fs);
			        			var extent = fs.features[0].geometry.getExtent().expand(2.5);
			        			map.setExtent(extent);
			        			
			        			 var outline = SimpleLineSymbol("solid", new Color([116,254,101,0.6]), 3);
					            var symbol1 = new SimpleFillSymbol()
					            		.setColor(new Color([255,255,0,0.15]))
					            		.setOutline(outline);
					            var geometry1 = fs.features[0].geometry;
					            graphic1 = new Graphic(geometry1, symbol1);
					            
					            graphicsLayer.add(graphic1);
					            
			        		});
			        		
			        		
			        		});
		        		
		        	}
		        }
		        showDetails = function(str){
					console.log(str);
					alert(str);
				}
		        function generateRender(){
		        	
				var outFields = ["*"];
				
				var content = "内容显示:\n<a href='javascript: showDetails(\"${Code}\")'>${NAME}</a>";
				var template = new InfoTemplate("${NAME}",content);
				
				wash = new FeatureLayer(dUrl,{
					"id":"dishi",
					"mode":FeatureLayer.MODE_ONDEMAND,
					"outFields":outFields,
					"infoTemplate":template,
					"opacity":0.8
				});
				
				map.addLayer(wash);
				//caculatePrice_rendering
				 var br = new ClassBreaksRenderer(null, "Value");
					  var outline = SimpleLineSymbol("solid", new Color("#444"), 1);
					    br.addBreak(0, 1, new SimpleFillSymbol("solid", outline, new Color([255, 255, 178, 0.55])));
		            	br.addBreak(1, 2, new SimpleFillSymbol("solid", outline, new Color([254, 204, 92, 0.55])));
		            	br.addBreak(2, 3, new SimpleFillSymbol("solid", outline, new Color([253, 141, 60, 0.55])));
		            	br.addBreak(3, 4, new SimpleFillSymbol("solid", outline, new Color([227, 26, 28, 0.55])));		            	
		
		            wash.setRenderer(br);
		            wash.redraw();
		            
		            //formingData();									
				
		        }
		        
		        function formingData(){
		        	
		        	var width = 0;
		        	
		        	pieData = new Array();
		        	var queryUrl = dUrl;
					var query = new Query();
					query.where = "1=1";
					query.outFields = ["*"];
					query.returnGeometry = true;
					
					var queryTask = new QueryTask(queryUrl);
					queryTask.execute(query, function(featureSet){
						if(featureSet.features.length >0){
							//console.log(featureSet.features);
							for(var i = 0; i< featureSet.features.length;i++){
								var feature = featureSet.features[i];
								
								width = feature.geometry.getExtent().getWidth();
								
								for(var j = 0; j<rendering_array.length;j++){
									if(feature.attributes["Code"] == rendering_array[j].DIST_CODE){
										
										//console.log(rendering_array[j]);
										x = feature.geometry.getCentroid().x;
										y = feature.geometry.getCentroid().y;
										//console.log("地图饼图名称",rendering_array[j]["NAME"]);
										var attr = {
											'name':rendering_array[j]["NAME"][0],
											'指标一':rendering_array[j]["指标一"][0],
											'指标二':rendering_array[j]["指标二"][0],
											'指标三':rendering_array[j]["指标三"][0],
											'指标四':rendering_array[j]["指标四"][0],
											'指标五':rendering_array[j]["指标五"][0]
										};
										var obj = {
											"x": x,
											"y": y,
											"attributes":attr											
										};
										pieData.push(obj);

										
									}
								}
							}
							
							
						}
						//console.log(pieData);
						 var data = pieData;
			            
			            
			            //var resolution = map.extent.getWidth() / map.width;			            
			            //var r = 0.35*width/resolution;
			            
			            var r = 1/20*map.width;
			            pielayerR = r;
			            //饼图
						pielayer= new PiesLayer({colors:colors,r:65,data:data});
				        map.addLayer(pielayer);
//				       //or 有也可以通过 pielayer.add()来动态地添加Pie 比如
//				       pielayer.add(data6);
//				       pielayer.add(data7);
				       //在click ，mouse-move ，mouse-over，mouse-down mouse-up事件里 可以获得被点击哪一个Pie的 哪一部分 如下
				       
				       on(pielayer,'mouse-move',function(e){
				        var piedata=e.piedata; 
				        //通过e.piedata可以获得当前区域的所有的数据的集合如{'name':'AA地区','指标一':30,'指标二':40,'指标三':50,'指标四':60,'指标五':70}
				        console.log(e);
				        var  name=piedata.name;
				        var slecetedata=e.slecetedata;    
				        map.infoWindow.setContent(name+"   "+JSON.stringify(slecetedata));
				         map.infoWindow.show(e.mapPoint);
				       }); 
				       
					});
										
		        }
		        
		        function caculatePrice_rendering(graphic){
		        	console.log(graphic.attributes.DIST_CODE);
					var code = graphic.attributes.DIST_CODE;
					  	  for(var i=0;i<rendering_array.length;i++){
					  	  	if(rendering_array[i].DIST_CODE == code){
					  	  		return rendering_array[i].value;
					  	  	}
					  	  }
				}
		       function classBreakRender(){
		       	
		       		
		       }		
				
				var flag = 0;
				var subFlag = 0;
				var thirdFlag = 0;
				dom.byId("menuContent").style.display = "none";
				dom.byId("stastics").style.display = "none";
				dom.byId("historyChart").style.display = "none";
				
				on(dom.byId("switcher"), 'click', function(){
					if(flag == 0){
						
						dom.byId('switcher').src = "images/right_small.png";
						query("#switcher").removeClass("switcherOff");
						query("#switcher").addClass("switcherOn");
						
						if(subFlag == 0){
														
							clearClass(query("#subSwitcher"));
							query("#subSwitcher").addClass("sub_switcher10");
							
						} else if(subFlag == 1){
//							console.log(query("#subSwitcher"));		
//							console.log(query("#subSwitcher")[0].classList);
							clearClass(query("#subSwitcher"));
							query("#subSwitcher").addClass("sub_switcher11");
							clearClass(query("#subContainer"));
							query("#subContainer").addClass("subContainer11");
						}				
						
						query("#container").removeClass("floatContainerOff");
						query("#container").addClass("floatContainerOn");						
						dom.byId("menuContent").style.display = "block";
						flag = 1;
						
					}else if(flag == 1){
						
						dom.byId('switcher').src = "images/left_small.png";
						query("#switcher").removeClass("switcherOn");
						query("#switcher").addClass("switcherOff");
						
						if(subFlag == 0){
														
						clearClass(query("#subSwitcher"));
						query("#subSwitcher").addClass("sub_switcher00");
						dom.byId("stastics").style.display = "none";
							
						} else if(subFlag == 1){
							
							clearClass(query("#subSwitcher"));
							query("#subSwitcher").addClass("sub_switcher01");
							clearClass(query("#subContainer"));
							query("#subContainer").addClass("subContainer01");
							dom.byId("stastics").style.display = "block";
							
							clearClass(query("#thirdContainer"));
							query("#thirdContainer").addClass("thirdContainer011");
						}
												
						query("#container").removeClass("floatContainerOn");
						query("#container").addClass("floatContainerOff");						
						dom.byId("menuContent").style.display = "none";
						flag = 0;
					}
					
				});
				on(dom.byId("subSwitcher"), 'click', function(){
					
					if(subFlag == 0){
						
						dom.byId('subSwitcher').src = "images/right_big.png";
						dom.byId("stastics").style.display = "block";
						subFlag = 1;
						if(flag == 0){
							clearClass(query("#subSwitcher"));
							query("#subSwitcher").addClass("sub_switcher01");						
							clearClass(query("#subContainer"));
							query("#subContainer").addClass("subContainer01");
						}
						else if(flag == 1){
							clearClass(query("#subSwitcher"));
							query("#subSwitcher").addClass("sub_switcher11");
							clearClass(query("#subContainer"));
							query("#subContainer").addClass("subContainer11");
						}
						if(thirdFlag == 0){
							dom.byId("thirdContainer").style.display = "block";
							clearClass(query("#thirdContainer"));
							query("#thirdContainer").addClass("thirdContainer00");
						}
						else if(thirdFlag == 1){
							dom.byId("thirdContainer").style.display = "block";
							clearClass(query("#thirdContainer"));
							query("#thirdContainer").addClass("thirdContainer11");
						}
					}					
					else if(subFlag == 1){
						dom.byId('subSwitcher').src = "images/left_big.png";
						clearClass(query("#subSwitcher"));
						dom.byId("stastics").style.display = "none";
						dom.byId("thirdContainer").style.display = "none";						
						subFlag = 0;
						
						if(flag == 0){
							clearClass(query("#subSwitcher"));
							query("#subSwitcher").addClass("sub_switcher00");
							clearClass(query("#subContainer"));						
							query("#subContainer").addClass("subContainer00");
						}
						else if(flag == 1){
							clearClass(query("#subSwitcher"));
							query("#subSwitcher").addClass("sub_switcher10");
							clearClass(query("#subContainer"));						
							query("#subContainer").addClass("subContainer10");
						}
						
					}					
					
						
				});
				
				on(dom.byId("thirdSwitcher"),'click',function(){
					console.log(query("#barChart>svg"));
					
					if(thirdFlag == 0){
						dom.byId("historyChart").style.display = "block";
						dom.byId("thirdSwitcher").src = "images/right.png";
						clearClass(query("#thirdContainer"));						
						query("#thirdContainer").addClass("thirdContainer11");
						thirdFlag = 1;
					}
					else if(thirdFlag == 1){
						dom.byId("historyChart").style.display = "none";
						dom.byId("thirdSwitcher").src = "images/left.png";
						clearClass(query("#thirdContainer"));						
						query("#thirdContainer").addClass("thirdContainer00");
						thirdFlag = 0;
					}
				});
				
				function clearClass(obj){
					if(obj){
						var classNames = obj[0].classList;
						for(var i = 0; i< classNames.length; i++){
							obj.removeClass(classNames[i]);
						}
					}
				}
				
				
			});
			

var indicators = [
	{
		"name":"人口统计",
		"code":"elcbmjhzb"
	},{
		"name":"土地统计",
		"code":"tudi"
	}
];

var data1={x: 13567611.673366752,y:5174359.8470072355,attributes:{'name':'AA地区','指标一':30,'指标二':40,'指标三':50,'指标四':60,'指标五':70}};
 var data2={x: 12041317.092568759,y:4988464.994217737,attributes:{'name':'BB地区','指标一':50,'指标二':60,'指标三':20,'指标四':160,'指标五':80}};
 var data3={x: 11131410.707862262,y:4328049.069833989,attributes:{'name':'CC地区','指标一':50,'指标二':60,'指标三':120,'指标四':60,'指标五':80}};
 var data4={x: 13303445.303613253,y:3594253.5982964924,attributes:{'name':'DD地区','指标一':50,'指标二':60,'指标三':20,'指标四':60,'指标五':80}};
 var data5={x: 11782042.69262551,y:3061028.8889792445,attributes:{'name':'EE地区','指标一':250,'指标二':60,'指标三':120,'指标四':60,'指标五':80}};
 var data6={x: 10485670.692909265,y:4010071.03216774,attributes:{'name':'FF地区','指标一':150,'指标二':60,'指标三':20,'指标四':60,'指标五':80}};
 var data7={x: 8749021.410270521,y:5052060.601750986,attributes:{'name':'GG地区','指标一':50,'指标二':160,'指标三':20,'指标四':60,'指标五':80}};
 var colors={'指标一':"#CC3300",'指标二':'#00CC33','指标三':'#02EAF9','指标四':'#CC9933','指标五':'#FFFF33'};

var rendering_array = [
	{
		"DIST_CODE": 530000,
		"NAME": "云南",
		"value": 356,
		"指标一":30,
		"指标二":40,
		"指标三":20,
		"指标四":35,
		"指标五":60
		
	},
	{
		"DIST_CODE": 150000,
		"NAME": "内蒙古",
		"value": 248,
		"指标一":60,
		"指标二":43,
		"指标三":50,
		"指标四":660,
		"指标五":30
	},
	{
		"DIST_CODE": 220000,
		 "NAME": "吉林省",
		"value": 356,
		"指标一":30,
		"指标二":40,
		"指标三":50,
		"指标四":60,
		"指标五":70
	},
	{
		 "DIST_CODE": 510000,
		 "NAME": "四川省",
		 "value": 306,
		 "指标一":30,
		"指标二":40,
		"指标三":50,
		"指标四":60,
		"指标五":70
	},
	{
		"DIST_CODE": 340000,
		"NAME": "安徽省",
		"value": 456,
		"指标一":30,
		"指标二":40,
		"指标三":50,
		"指标四":60,
		"指标五":70
	},
	{
		"DIST_CODE": 640000,
		"NAME": "宁夏",
		"value": 356,
		"指标一":30,
		"指标二":40,
		"指标三":50,
		"指标四":60,
		"指标五":70
	},
	{
		"DIST_CODE": 370000,
		"NAME": "山东省",
		"value": 556,
		"指标一":35,
		"指标二":50,
		"指标三":30,
		"指标四":54,
		"指标五":40
	},
	{
		"DIST_CODE": 650000,
		"NAME": "新疆",
		"value": 156,
		"指标一":65,
		"指标二":50,
		"指标三":30,
		"指标四":74,
		"指标五":40
	}
	
];
/*
 * ,
	{
		"DIST_CODE": 140000,
		"NAME": "山西省",
		"value": 536,
		"指标一":65,
		"指标二":50,
		"指标三":30,
		"指标四":74,
		"指标五":40
	},
	{
		"DIST_CODE": 450000,
		"NAME": "广西",
		"value": 556,
		"指标一":65,
		"指标二":50,
		"指标三":30,
		"指标四":74,
		"指标五":40
	},
	{
		"DIST_CODE": 440000,
		"NAME": "广东省",
		"value": 856,
		"指标一":35,
		"指标二":57,
		"指标三":45,
		"指标四":74,
		"指标五":65
	},
	{
		"DIST_CODE": 320000,
		"NAME": "江苏省",
		"value": 456,
		"指标一":55,
		"指标二":57,
		"指标三":85,
		"指标四":74,
		"指标五":55
	}
 
 */

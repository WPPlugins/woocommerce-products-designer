var WPD_EDITOR = (function ($, wpd_editor) {
    //editor shapes
    $(document).on("click", "#square-btn", function (e) {
        var bg_color = $("#shape-bg-color-selector").css("background-color");
        var outline_color = $("#shape-outline-color-selector").css("background-color");
        var opacity = $("#shape-opacity-slider").val();

        if (!bg_color)
            bg_color = "#4f71b9";

        if (!opacity)
            opacity = 1;

        var rect = new fabric.Rect({
            left: 100,
            top: 50,
            fill: bg_color,
            opacity: opacity,
            width: 50,
            height: 50
        });

        var outline_width = $("#shape-thickness-slider").val();
        if (outline_width > 0)
        {
            rect.set("strokeWidth", parseInt(outline_width));
            rect.set("stroke", outline_color);
        }

        wpd_editor.setCustomProperties(rect);
        wpd_editor.canvas.add(rect);
        wpd_editor.centerObjectH(rect);
        wpd_editor.centerObjectV(rect);
        wpd_editor.canvas.renderAll();
        rect.setCoords();
        wpd_editor.save_canvas();
    });

    $("#shape-thickness-slider").change(function ()
    {
        var selected_object = wpd_editor.canvas.getActiveObject();
        if (selected_object != null)
        {
            var arr_shapes = ["rect", "circle", "triangle", "polygon", "path"];
            if (jQuery.inArray(selected_object.type, arr_shapes) >= 0)
            {
                var outline_color = $("#shape-outline-color-selector").css("background-color");
                var outline_width = $("#shape-thickness-slider").val();
                if (selected_object != null)
                {
                    if (outline_width > 0)
                    {
                        selected_object.set("strokeWidth", parseInt(outline_width));
                        selected_object.set("stroke", outline_color);
                    }
                    else
                        selected_object.set("stroke", false);
                }
                wpd_editor.canvas.renderAll();
            }
        }
    });

    $("#r-square-btn").click(function ()
    {
        var bg_color = $("#shape-bg-color-selector").css("background-color");
        var outline_color = $("#shape-outline-color-selector").css("background-color");
        var opacity = $("#shape-opacity-slider").val();

        if (!bg_color)
            bg_color = "#4f71b9";

        if (!opacity)
            opacity = 1;

        var rect = new fabric.Rect({
            left: 100,
            top: 50,
            fill: bg_color,
            opacity: opacity,
            width: 50,
            height: 50,
            rx: 10,
            ry: 10,
            selectable: true
        });

        var outline_width = $("#shape-thickness-slider").val();
        if (outline_width > 0)
        {
            rect.set("strokeWidth", parseInt(outline_width));
            rect.set("stroke", outline_color);
        }

        wpd_editor.setCustomProperties(rect);
        wpd_editor.canvas.add(rect);
        wpd_editor.centerObjectH(rect);
        wpd_editor.centerObjectV(rect);
        wpd_editor.canvas.renderAll();
        rect.setCoords();
        wpd_editor.save_canvas();
    });

    $(document).on("click", "#circle-btn", function (e) {
        var bg_color = $("#shape-bg-color-selector").css("background-color");
        var outline_color = $("#shape-outline-color-selector").css("background-color");
        var opacity = $("#shape-opacity-slider").val();

        if (!bg_color)
            bg_color = "#4f71b9";

        if (!opacity)
            opacity = 1;

        var circle = new fabric.Circle({
            left: 100,
            top: 50,
            fill: bg_color,
            opacity: opacity,
            radius: 25,
            selectable: true
        });

        var outline_width = $("#shape-thickness-slider").val();
        if (outline_width > 0)
        {
            circle.set("strokeWidth", parseInt(outline_width));
            circle.set("stroke", outline_color);
        }

        wpd_editor.setCustomProperties(circle);
        wpd_editor.canvas.add(circle);
        wpd_editor.centerObjectH(circle);
        wpd_editor.centerObjectV(circle);
        wpd_editor.canvas.renderAll();
        circle.setCoords();
        wpd_editor.save_canvas();
    });

    $(document).on("click", "#triangle-btn", function (e) {
        var bg_color = $("#shape-bg-color-selector").css("background-color");
        var outline_color = $("#shape-outline-color-selector").css("background-color");
        var opacity = $("#shape-opacity-slider").val();

        if (!bg_color)
            bg_color = "#4f71b9";

        if (!opacity)
            opacity = 1;

        var triangle = new fabric.Triangle({
            left: 100,
            top: 50,
            fill: bg_color,
            opacity: opacity,
            width: 50,
            height: 50,
            selectable: true
        });

        var outline_width = $("#shape-thickness-slider").val();
        if (outline_width > 0)
        {
            triangle.set("strokeWidth", parseInt(outline_width));
            triangle.set("stroke", outline_color);
        }

        wpd_editor.setCustomProperties(triangle);
        wpd_editor.canvas.add(triangle);
        wpd_editor.centerObjectH(triangle);
        wpd_editor.centerObjectV(triangle);
        wpd_editor.canvas.renderAll();
        triangle.setCoords();
        wpd_editor.save_canvas();
    });

    $(document).on("click", "#heart-btn", function (e) {
        var bg_color = $("#shape-bg-color-selector").css("background-color");
        var outline_color = $("#shape-outline-color-selector").css("background-color");
        var opacity = $("#shape-opacity-slider").val();
        var outline_width = $("#shape-thickness-slider").val();

        if (!bg_color)
            bg_color = "#4f71b9";

        if (!opacity)
            opacity = 1;

        var heart = new fabric.Path('M 272.70141,238.71731 \
            C 206.46141,238.71731 152.70146,292.4773 152.70146,358.71731  \
            C 152.70146,493.47282 288.63461,528.80461 381.26391,662.02535 \
            C 468.83815,529.62199 609.82641,489.17075 609.82641,358.71731 \
            C 609.82641,292.47731 556.06651,238.7173 489.82641,238.71731  \
            C 441.77851,238.71731 400.42481,267.08774 381.26391,307.90481 \
            C 362.10311,267.08773 320.74941,238.7173 272.70141,238.71731  \
            z ');
        var scale = 100 / heart.width;

        heart.set({
            left: 100,
            top: 50,
            scaleX: scale,
            scaleY: scale,
            fill: bg_color,
            opacity: opacity,
            selectable: true
        });
        if (outline_width > 0)
        {
            heart.set("strokeWidth", parseInt(outline_width));
            heart.set("stroke", outline_color);
        }
        wpd_editor.setCustomProperties(heart);
        wpd_editor.canvas.add(heart);
        wpd_editor.centerObjectH(heart);
        wpd_editor.centerObjectV(heart);
        wpd_editor.canvas.renderAll();
        heart.setCoords();
        wpd_editor.save_canvas();
    });

    $(document).on("click", ".polygon-btn", function (e) {
        var bg_color = $("#shape-bg-color-selector").css("background-color");
        var outline_color = $("#shape-outline-color-selector").css("background-color");
        var opacity = $("#shape-opacity-slider").val();
        var nb_points = $(this).data("num");
//                console.log(nb_points);


        if (!bg_color)
            bg_color = "#4f71b9";

        if (!opacity)
            opacity = 1;

        var startPoints = [];
        if (nb_points == 5)
        {
            startPoints = [
                {x: 0, y: 50},
                {x: 45, y: 80},
                {x: 85, y: 50},
                {x: 70, y: 0},
                {x: 17, y: 0}
            ];


        }
        else if (nb_points == 6)
        {
            startPoints = [
                {x: 45, y: 90},
                {x: 90, y: 70},
                {x: 90, y: 20},
                {x: 45, y: 0},
                {x: 0, y: 20},
                {x: 0, y: 70}
            ];


        }
        else if (nb_points == 7)
        {
            startPoints = [
                {x: 26, y: 90},
                {x: 65, y: 90},
                {x: 88, y: 57},
                {x: 81, y: 18},
                {x: 45, y: 0},
                {x: 12, y: 18},
                {x: 0, y: 58}
            ];
        }
        else if (nb_points == 8)
        {
            startPoints = [
                {x: 28, y: 90},
                {x: 63, y: 90},
                {x: 90, y: 63},
                {x: 90, y: 27},
                {x: 63, y: 0},
                {x: 28, y: 0},
                {x: 0, y: 27},
                {x: 0, y: 63}
            ];


        }
        else if (nb_points == 9)
        {
            startPoints = [
                {x: 45, y: 90},
                {x: 75, y: 80},
                {x: 90, y: 52},
                {x: 85, y: 20},
                {x: 60, y: 0},
                {x: 30, y: 0},
                {x: 8, y: 20},
                {x: 0, y: 53},
                {x: 17, y: 78}
            ];

        }
        else if (nb_points == 10)
        {
            startPoints = [
                {x: 35, y: 90},
                {x: 63, y: 90},
                {x: 86, y: 74},
                {x: 95, y: 47},
                {x: 86, y: 19},
                {x: 63, y: 0},
                {x: 35, y: 0},
                {x: 11, y: 19},
                {x: 0, y: 45},
                {x: 11, y: 72}
            ];
        }


        var clonedStartPoints = startPoints.map(function (o) {
            return fabric.util.object.clone(o);
        });

        var polygon = new fabric.Polygon(clonedStartPoints, {
            left: 100,
            top: 50,
            fill: bg_color,
            opacity: opacity,
            selectable: true
        });

        var outline_width = $("#shape-thickness-slider").val();
        if (outline_width > 0)
        {
            polygon.set("strokeWidth", parseInt(outline_width));
            polygon.set("stroke", outline_color);
        }

        wpd_editor.setCustomProperties(polygon);
        wpd_editor.canvas.add(polygon);
        wpd_editor.centerObjectH(polygon);
        wpd_editor.centerObjectV(polygon);
        wpd_editor.canvas.renderAll();
        polygon.setCoords();
        wpd_editor.save_canvas();
    });

    $(document).on("click", ".star-btn", function (e) {
        var bg_color = $("#shape-bg-color-selector").css("background-color");
        var outline_color = $("#shape-outline-color-selector").css("background-color");
        var opacity = $("#shape-opacity-slider").val();
        var nb_points = $(this).data("num");
        var startPoints = [];

        if (!bg_color)
            bg_color = "#4f71b9";

        if (!opacity)
            opacity = 1;

        if (nb_points == 5)
        {
            startPoints = [
                {x: 46, y: 90},
                {x: 58, y: 56},
                {x: 93, y: 55},
                {x: 65, y: 35},
                {x: 77, y: 0},
                {x: 48, y: 22},
                {x: 19, y: 0},
                {x: 30, y: 35},
                {x: 0, y: 56},
                {x: 37, y: 56}
            ];


        }
        else if (nb_points == 6)
        {
            startPoints = [
                {x: 40, y: 90},
                {x: 54, y: 68},
                {x: 79, y: 68},
                {x: 66, y: 45},
                {x: 79, y: 23},
                {x: 53, y: 23},
                {x: 40, y: 0},
                {x: 26, y: 23},
                {x: 0, y: 23},
                {x: 14, y: 45},
                {x: 0, y: 68},
                {x: 26, y: 68}
            ];


        }
        else if (nb_points == 7)
        {
            startPoints = [
                {x: 49, y: 90},
                {x: 57, y: 60},
                {x: 87, y: 74},
                {x: 64, y: 47},
                {x: 91, y: 34},
                {x: 64, y: 34},
                {x: 71, y: 0},
                {x: 47, y: 26},
                {x: 25, y: 0},
                {x: 31, y: 32},
                {x: 0, y: 32},
                {x: 31, y: 47},
                {x: 7, y: 74},
                {x: 39, y: 60}
            ];
        }
        else if (nb_points == 8)
        {
            startPoints = [
                {x: 46, y: 90},
                {x: 52, y: 63},
                {x: 77, y: 78},
                {x: 61, y: 53},
                {x: 89, y: 46},
                {x: 61, y: 40},
                {x: 77, y: 14},
                {x: 52, y: 30},
                {x: 46, y: 0},
                {x: 37, y: 30},
                {x: 14, y: 14},
                {x: 27, y: 39},
                {x: 0, y: 46},
                {x: 27, y: 53},
                {x: 13, y: 77},
                {x: 37, y: 62}
            ];


        }
        else if (nb_points == 9)
        {
            startPoints = [
                {x: 45, y: 90},
                {x: 56, y: 73},
                {x: 74, y: 79},
                {x: 71, y: 59},
                {x: 88, y: 52},
                {x: 74, y: 39},
                {x: 84, y: 21},
                {x: 65, y: 21},
                {x: 61, y: 0},
                {x: 45, y: 14},
                {x: 30, y: 0},
                {x: 26, y: 21},
                {x: 7, y: 12},
                {x: 16, y: 39},
                {x: 0, y: 51},
                {x: 18, y: 59},
                {x: 16, y: 79},
                {x: 34, y: 73}
            ];


        }
        else if (nb_points == 10)
        {
            startPoints = [
                {x: 35, y: 90},
                {x: 50, y: 81},
                {x: 63, y: 90},
                {x: 69, y: 73},
                {x: 88, y: 73},
                {x: 82, y: 56},
                {x: 96, y: 46},
                {x: 82, y: 36},
                {x: 87, y: 18},
                {x: 70, y: 18},
                {x: 63, y: 0},
                {x: 49, y: 12},
                {x: 35, y: 0},
                {x: 28, y: 18},
                {x: 11, y: 18},
                {x: 17, y: 35},
                {x: 0, y: 46},
                {x: 17, y: 56},
                {x: 11, y: 73},
                {x: 28, y: 73}
            ];
        }


        var clonedStartPoints = startPoints.map(function (o) {
            return fabric.util.object.clone(o);
        });

        var star = new fabric.Polygon(clonedStartPoints, {
            left: 100,
            top: 50,
            fill: bg_color,
            opacity: opacity,
            selectable: true
        });

        var outline_width = $("#shape-thickness-slider").val();
        if (outline_width > 0)
        {
            star.set("strokeWidth", parseInt(outline_width));
            star.set("stroke", outline_color);
        }

        wpd_editor.setCustomProperties(star);
        wpd_editor.canvas.add(star);
        wpd_editor.centerObjectH(star);
        wpd_editor.centerObjectV(star);
        wpd_editor.canvas.renderAll();
        star.setCoords();
        wpd_editor.save_canvas();
    });
    //End shapes

    return wpd_editor;
}(jQuery, (WPD_EDITOR || {})))
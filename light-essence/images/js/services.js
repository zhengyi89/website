<script src="js/jquery.min.1.10.2.js"></script>  
<script src="js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
    <script>     
            function showPDF(urlSrc){ 
                var urlPre ="pdfjs/web/viewer.html?file="+ urlSrc; 
                $("#pdfContainer").attr('src',urlPre);  
                $("#pdf_Modal").modal("show"); 
            } 
    </script>
# resource "aws_cloudfront_distribution" "distribution" {
#     aliases                        = [
#         "seuminu.com",
#         "www.seuminu.com",
#     ]
#     default_root_object            = "index.html"
#     enabled                        = true
#     http_version                   = "http2"
#     is_ipv6_enabled                = false
#     price_class                    = "PriceClass_All"
#     retain_on_delete               = false
#     tags                           = {}
#     wait_for_deployment            = true

#     custom_error_response {
#         error_caching_min_ttl = 10
#         error_code            = 404
#         response_code         = 200
#         response_page_path    = "/index.html"
#     }

#     default_cache_behavior {
#         allowed_methods        = ["DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT",]
#         cached_methods         = ["GET","HEAD"]
#         compress               = false
#         default_ttl            = 0
#         max_ttl                = 0
#         min_ttl                = 0
#         smooth_streaming       = false
#         target_origin_id       = "Custom-ec2-3-23-231-99.us-east-2.compute.amazonaws.com"
#         trusted_signers        = []
#         viewer_protocol_policy = "redirect-to-https"
#     }

#     logging_config {
#         bucket          = "minu-general.s3.amazonaws.com"
#         include_cookies = false
#         prefix          = "minu_site/cloudfront/logs/"
#     }

#     origin {
#         domain_name = "minu-site-deployment.s3-website-us-east-1.amazonaws.com"
#         origin_id   = "Custom-ec2-3-23-231-99.us-east-2.compute.amazonaws.com"

#         custom_origin_config {
#             http_port                = 80
#             https_port               = 443
#             origin_keepalive_timeout = 5
#             origin_protocol_policy   = "http-only"
#             origin_read_timeout      = 30
#             origin_ssl_protocols     = [
#                 "TLSv1",
#                 "TLSv1.1",
#                 "TLSv1.2",
#             ]
#         }
#     }

#     restrictions {
#         geo_restriction {
#             locations        = []
#             restriction_type = "none"
#         }
#     }

#     viewer_certificate {
#         acm_certificate_arn            = "arn:aws:acm:us-east-1:108961151232:certificate/b77500c2-4d83-4a57-b279-d64b4e35d931"
#         cloudfront_default_certificate = false
#         minimum_protocol_version       = "TLSv1.2_2019"
#         ssl_support_method             = "sni-only"
#     }
# }

$headers = @{ "Content-Type" = "application/json" }
$loginBody = @{
    usernameOrEmail = "testuser"
    password = "StrongP@ss123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -Headers $headers -Body $loginBody
    Write-Output "Login Successful: $($loginResponse | ConvertTo-Json)"
} catch {
    Write-Output "Login Failed: $_"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $respBody = $reader.ReadToEnd()
        Write-Output "Error Body: $respBody"
    }
}

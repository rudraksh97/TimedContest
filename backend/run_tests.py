#!/usr/bin/env python3
"""
Test runner script for the Timed Contest API
"""

import subprocess
import sys
import os
from pathlib import Path

def run_tests():
    """Run all tests and return exit code"""
    
    # Change to backend directory
    backend_dir = Path(__file__).parent
    os.chdir(backend_dir)
    
    print("🧪 Running Timed Contest API Tests")
    print("=" * 50)
    
    # Run pytest with coverage
    cmd = [
        sys.executable, "-m", "pytest", 
        "test_main.py",
        "-v",
        "--tb=short",
        "--disable-warnings"
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=False, text=True)
        
        if result.returncode == 0:
            print("\n✅ All tests passed!")
        else:
            print(f"\n❌ Tests failed with exit code {result.returncode}")
            
        return result.returncode
        
    except Exception as e:
        print(f"❌ Error running tests: {e}")
        return 1

def run_integration_test():
    """Run a simplified integration test without pytest"""
    
    print("🔧 Running simplified integration test...")
    
    import asyncio
    from httpx import AsyncClient
    from main import app
    
    async def test_basic_endpoints():
        async with AsyncClient(app=app, base_url="http://test") as client:
            # Test health endpoint
            response = await client.get("/health")
            assert response.status_code == 200
            print("✅ Health endpoint working")
            
            # Test contests endpoint
            response = await client.get("/contests")
            assert response.status_code == 200
            print("✅ Contests endpoint working")
            
            # Test stats endpoint
            response = await client.get("/stats/overview")
            assert response.status_code == 200
            print("✅ Stats endpoint working")
            
            print("✅ Basic integration test passed!")
    
    try:
        asyncio.run(test_basic_endpoints())
        return 0
    except Exception as e:
        print(f"❌ Integration test failed: {e}")
        return 1

if __name__ == "__main__":
    # Try to run full pytest suite first
    try:
        import pytest
        exit_code = run_tests()
    except ImportError:
        print("⚠️  pytest not available, running simplified test...")
        exit_code = run_integration_test()
    
    sys.exit(exit_code)

